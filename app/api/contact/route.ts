import { createHmac, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { SERVICES } from '@/lib/site';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_RATE_LIMIT_KEYS = 10_000;
const SCRIPT_TIMEOUT_MS = 10_000;
const hits = new Map<string, { count: number; resetAt: number }>();
const ALLOWED_SERVICES = new Set([...SERVICES.map(({ title }) => title), 'Something else']);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,30}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Enquiry = {
  requestId?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  project?: unknown;
  consent?: unknown;
  website?: unknown;
};

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size >= MAX_RATE_LIMIT_KEYS) {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }

  const key = hits.has(ip) || hits.size < MAX_RATE_LIMIT_KEYS ? ip : '__overflow__';
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function cleanSingleLine(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

function cleanProject(value: unknown): string {
  return typeof value === 'string'
    ? value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim()
    : '';
}

async function readJsonBody(request: Request): Promise<{ body?: Enquiry; error?: 'too_large' | 'invalid' }> {
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) return { error: 'too_large' };

  const reader = request.body?.getReader();
  if (!reader) return { error: 'invalid' };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { error: 'too_large' };
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const parsed: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { error: 'invalid' };
    return { body: parsed as Enquiry };
  } catch {
    return { error: 'invalid' };
  }
}

function isGoogleAppsScriptUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'script.google.com' ||
      !url.pathname.startsWith('/macros/s/')
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function isAllowedRedirect(url: URL): boolean {
  return (
    url.protocol === 'https:' &&
    (url.hostname === 'script.google.com' ||
      url.hostname === 'script.googleusercontent.com' ||
      url.hostname.endsWith('.googleusercontent.com'))
  );
}

async function forwardToAppsScript(url: URL, payload: Record<string, unknown>): Promise<Response> {
  let destination = url;
  let method = 'POST';
  let body: string | undefined = JSON.stringify(payload);

  for (let redirects = 0; redirects <= 3; redirects += 1) {
    const response = await fetch(destination, {
      method,
      headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
      body: method === 'POST' ? body : undefined,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(SCRIPT_TIMEOUT_MS),
    });

    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get('location');
    if (!location || redirects === 3) throw new Error('Invalid Apps Script redirect.');

    const nextDestination = new URL(location, destination);
    if (!isAllowedRedirect(nextDestination)) throw new Error('Apps Script redirected to an untrusted host.');
    await response.body?.cancel();
    if ([301, 302, 303].includes(response.status)) {
      method = 'GET';
      body = undefined;
    }
    destination = nextDestination;
  }

  throw new Error('Too many Apps Script redirects.');
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ error: 'Request not allowed.' }, 403);
    } catch {
      return json({ error: 'Request not allowed.' }, 403);
    }
  }

  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return json({ error: 'A JSON request body is required.' }, 415);
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = request.headers.get('x-real-ip')?.trim() || forwardedFor?.split(',').pop()?.trim() || 'unknown';
  if (isRateLimited(ip)) return json({ error: 'Too many requests. Please try again later.' }, 429);

  const parsed = await readJsonBody(request);
  if (parsed.error === 'too_large') return json({ error: 'Request body is too large.' }, 413);
  if (!parsed.body) return json({ error: 'Invalid JSON request body.' }, 400);
  const body = parsed.body;

  if (typeof body.website === 'string' && body.website.trim()) {
    return json({ error: 'Invalid enquiry.' }, 400);
  }

  const name = cleanSingleLine(body.name);
  const email = cleanSingleLine(body.email);
  const phone = cleanSingleLine(body.phone);
  const service = cleanSingleLine(body.service);
  const project = cleanProject(body.project);
  const consent = body.consent === true;
  const requestId = typeof body.requestId === 'string' && UUID_PATTERN.test(body.requestId) ? body.requestId : null;

  if (name.length < 2 || name.length > 100) return json({ error: 'Enter a name between 2 and 100 characters.' }, 400);
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return json({ error: 'Enter a valid email address.' }, 400);
  if (phone && !PHONE_PATTERN.test(phone)) return json({ error: 'Enter a valid phone number.' }, 400);
  if (!ALLOWED_SERVICES.has(service)) return json({ error: 'Choose a listed service.' }, 400);
  if (project.length < 10 || project.length > 2000) return json({ error: 'Project details must be 10 to 2000 characters.' }, 400);
  if (!consent) return json({ error: 'Consent is required to submit an enquiry.' }, 400);
  if (body.requestId !== undefined && !requestId) return json({ error: 'Invalid enquiry request ID.' }, 400);

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
  if (!appsScriptUrl) {
    return json(
      {
        code: 'CONTACT_NOT_CONFIGURED',
        error: 'Contact processing is not configured. Set GOOGLE_APPS_SCRIPT_URL on the server.',
      },
      503,
    );
  }

  const appsScriptSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!appsScriptSecret) {
    return json(
      {
        code: 'CONTACT_NOT_CONFIGURED',
        error: 'Contact processing is not configured. Set GOOGLE_APPS_SCRIPT_SECRET on the server.',
      },
      503,
    );
  }

  const destination = isGoogleAppsScriptUrl(appsScriptUrl);
  if (!destination) {
    return json({ code: 'CONTACT_NOT_CONFIGURED', error: 'GOOGLE_APPS_SCRIPT_URL must be a deployed HTTPS Apps Script URL.' }, 503);
  }

  const enquiryId = requestId
    ? createHmac('sha256', appsScriptSecret).update(requestId).digest('hex')
    : randomUUID();
  const payload = {
    secret: appsScriptSecret,
    enquiryId,
    name,
    email,
    phone,
    service,
    project,
    consent,
  };

  try {
    const response = await forwardToAppsScript(destination, payload);
    const responseText = await response.text();
    if (!response.ok || Buffer.byteLength(responseText, 'utf8') > MAX_BODY_BYTES) {
      return json({ error: 'Enquiry processing failed.' }, 502);
    }

    let result: unknown;
    try {
      result = JSON.parse(responseText);
    } catch {
      return json({ error: 'The contact service returned an invalid response.' }, 502);
    }

    if (!result || typeof result !== 'object' || Array.isArray(result)) {
      return json({ error: 'The contact service returned an invalid response.' }, 502);
    }
    const confirmation = result as {
      success?: unknown;
      enquiryId?: unknown;
      businessEmailSent?: unknown;
      customerEmailSent?: unknown;
    };

    if (
      confirmation.success !== true ||
      confirmation.enquiryId !== enquiryId ||
      confirmation.businessEmailSent !== true
    ) {
      return json({ error: 'The enquiry was not confirmed as received.' }, 502);
    }

    return json({
      success: true,
      enquiryId,
      requestId,
      businessEmailSent: true,
      customerEmailSent: confirmation.customerEmailSent === true,
    });
  } catch (error) {
    const reason = error instanceof Error && error.name === 'TimeoutError' ? 'timed out' : 'failed';
    console.error(`Contact integration ${reason}.`);
    return json({ error: 'Enquiry processing failed. Please try again.' }, 502);
  }
}
