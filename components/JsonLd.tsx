/**
 * components/JsonLd.tsx
 * ---------------------------------------------------------------
 * Puts "structured data" into a page. This is a block of information, written
 * in the JSON-LD format, that search engines read to understand things like
 * "this is a business", "this is a list of FAQs" or "this is the breadcrumb
 * trail". It is invisible to visitors.
 */

/**
 * JsonLd
 *  - data: any JavaScript object that follows the schema.org format.
 *
 * Why the `.replace`? If some text inside the data ever contained "</script>",
 * it could break out of the script tag and run as code. Replacing every "<"
 * with its escaped form makes that impossible. It is a small but important
 * safety step.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
