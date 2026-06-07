/**
 * Shared shell + typographic primitives for the legal pages (/security, /terms,
 * /privacy). Kept deliberately plain: readable measure, honest spacing, no
 * prose plugin dependency.
 *
 * TODO(owner / legal): these are good-faith, plain-English drafts. Have counsel
 * review before launch and fill in the bracketed [PLACEHOLDER] specifics
 * (legal entity, registered address, governing-law jurisdiction).
 */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-foreground-subtle">Last updated {updated}</p>
      {intro ? (
        <p className="mt-6 text-lg text-foreground-muted">{intro}</p>
      ) : null}
      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-foreground-muted">{children}</div>
    </section>
  );
}
