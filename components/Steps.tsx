/**
 * components/Steps.tsx
 * ---------------------------------------------------------------
 * The four-step "How we work" row: Discover, Design, Build, Launch and grow.
 * It is an ordered list (<ol>), which tells search engines and screen readers
 * that the steps happen in a sequence.
 */
import { PROCESS } from '@/lib/site';

export function Steps() {
  return (
    <ol className="steps">
      {PROCESS.map((step, index) => (
        <li key={step.title} className="step">
          {/* padStart(2, '0') turns 1 into "01", 2 into "02", and so on. */}
          <span className="step__num">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="step__title">{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
