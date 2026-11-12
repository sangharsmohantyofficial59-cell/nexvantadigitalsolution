/**
 * lib/links.ts
 * ---------------------------------------------------------------
 * Tiny helpers that build clickable links for phone, email and WhatsApp
 * from the details stored in lib/site.ts. Using one helper everywhere means
 * a number only has to be changed in one place.
 */
import { CONTACT } from './site';

/**
 * whatsappLink: builds a "click to chat" link (wa.me is WhatsApp's official
 * short link). `encodeURIComponent` converts spaces and symbols in the message
 * into a form that is safe to put inside a web address.
 */
export function whatsappLink(message: string = CONTACT.whatsappMessage): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** telLink: a link that opens the phone dialler on mobile ("tel:" is a standard link type). */
export function telLink(): string {
  return `tel:${CONTACT.phoneHref}`;
}

/** mailLink: a link that opens the visitor's email app ("mailto:" is a standard link type). */
export function mailLink(): string {
  return `mailto:${CONTACT.email}`;
}
