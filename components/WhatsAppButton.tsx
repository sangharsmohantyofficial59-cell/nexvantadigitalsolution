/**
 * components/WhatsAppButton.tsx
 * ---------------------------------------------------------------
 * The round green-gold button fixed to the bottom-right corner of every page.
 * One tap opens WhatsApp with a ready-made message. In India this is often
 * the fastest way for a customer to start a conversation.
 */
import { whatsappLink } from '@/lib/links';
import { Icon } from './Icon';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NEXVANTA on WhatsApp"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
