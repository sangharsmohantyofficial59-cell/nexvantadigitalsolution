'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/site';

const SUBMISSION_ERROR =
  "We couldn't submit your enquiry right now. Please try again or contact us directly through WhatsApp or phone.";

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const requestId = useRef<string | null>(null);
  const requestFingerprint = useRef<string | null>(null);
  const submissionInFlight = useRef(false);
  const sending = status === 'sending';
  const succeeded = status === 'success';

  useEffect(() => {
    if (!succeeded) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setStatus('idle');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [succeeded]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInFlight.current || sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const enquiry = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      service: data.get('service'),
      project: data.get('project'),
      consent: data.get('consent') === 'on',
      website: data.get('website'),
    };
    const fingerprint = JSON.stringify(enquiry);
    if (requestFingerprint.current !== fingerprint) {
      requestId.current = crypto.randomUUID();
      requestFingerprint.current = fingerprint;
    }
    submissionInFlight.current = true;
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: requestId.current,
          ...enquiry,
        }),
      });

      const result: unknown = await response.json();
      if (
        !response.ok ||
        !result ||
        typeof result !== 'object' ||
        !('success' in result) ||
        result.success !== true ||
        !('businessEmailSent' in result) ||
        result.businessEmailSent !== true ||
        !('requestId' in result) ||
        result.requestId !== requestId.current ||
        !('enquiryId' in result) ||
        typeof result.enquiryId !== 'string'
      ) {
        throw new Error('Enquiry was not confirmed.');
      }

      form.reset();
      requestId.current = null;
      requestFingerprint.current = null;
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      submissionInFlight.current = false;
    }
  }

  function closeSuccessModal() {
    setStatus('idle');
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name" className="field__label">
            Your name
          </label>
          <input id="name" name="name" type="text" className="input" required minLength={2} maxLength={100} autoComplete="name" />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="email" className="field__label">
              Email
            </label>
            <input id="email" name="email" type="email" className="input" required maxLength={254} autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="phone" className="field__label">
              Phone or WhatsApp (optional)
            </label>
            <input id="phone" name="phone" type="tel" className="input" maxLength={30} autoComplete="tel" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="service" className="field__label">
            What do you need?
          </label>
          <select id="service" name="service" className="input" defaultValue={SERVICES[0].title}>
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="message" className="field__label">
            Tell us about your project
          </label>
          <textarea id="message" name="project" className="input textarea" rows={5} required minLength={10} maxLength={2000} />
        </div>

        <div className="hp" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field field--check">
          <input id="consent" name="consent" type="checkbox" required />
          <label htmlFor="consent">
            I agree that NEXVANTA may contact me about this enquiry and store my details for that purpose. Read our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </label>
        </div>

        <div aria-live="polite" className="form__status">
          {status === 'error' && <p className="form__error" role="alert">{SUBMISSION_ERROR}</p>}
        </div>

        <button type="submit" className="btn btn--gold btn--lg" disabled={sending}>
          {sending && <span className="form__spinner" aria-hidden="true" />}
          {sending ? 'Sending Enquiry...' : 'Send enquiry'}
        </button>
      </form>

      {succeeded && (
        <div
          className="enquiry-modal"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeSuccessModal();
          }}
        >
          <section
            className="enquiry-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            aria-describedby="enquiry-modal-description"
          >
            <button
              type="button"
              className="enquiry-modal__close"
              aria-label="Close thank-you message"
              onClick={closeSuccessModal}
              autoFocus
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <span className="enquiry-modal__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="21" />
                <path d="m14 24 7 7 14-15" />
              </svg>
            </span>
            <h2 id="enquiry-modal-title">Thank You for Contacting NEXVANTA!</h2>
            <p id="enquiry-modal-description">
              Your enquiry has been successfully submitted. We appreciate your interest in our services.
            </p>
            <p>Our team will review your requirements and get back to you within one working day.</p>
            <Link href="/" className="btn btn--gold btn--lg" onClick={closeSuccessModal}>
              Back to Website
            </Link>
          </section>
        </div>
      )}
    </>
  );
}
