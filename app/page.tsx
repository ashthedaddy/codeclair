export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        Evening 2 — UI in progress
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-tight text-foreground sm:text-6xl">
        <span className="gradient-text">codeclair</span>
      </h1>
      <p className="mt-4 max-w-xl text-center text-base text-muted">
        Paste any code. Get a plain-language walkthrough, Big-O complexity,
        risks, and tests to write — in English or Québec French.
      </p>
    </main>
  );
}
