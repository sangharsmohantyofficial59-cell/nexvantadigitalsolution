/**
 * components/FaqList.tsx
 * ---------------------------------------------------------------
 * A list of questions that open and close when clicked. It uses the browser's
 * built-in <details> and <summary> elements, so it works without any
 * JavaScript, is keyboard friendly, and loads instantly.
 */

/**
 * FaqList
 *  - items: the questions and answers to show (from lib/site.ts)
 */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q} className="faq__item">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
