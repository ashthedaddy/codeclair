export function About() {
  return (
    <div>
      <section className="about-hero">
        <div className="brow">Dossier N° 003 · Note from the author</div>
        <h1>
          Why &ldquo;French&rdquo; <em>isn&rsquo;t a language.</em>
        </h1>
        <p className="lede">
          Every bilingual tool I&rsquo;ve used treats Québec like a rounding
          error. A Montreal reader clocks a Paris opener in half a second and
          stops trusting the output. codeclair is the fix.
        </p>
      </section>

      <article className="about-body">
        <p>
          I built codeclair in three evenings because I wanted a tool that
          explained code the way a senior engineer would &mdash; and because I
          wanted that explanation in my own register, not someone else&rsquo;s.
        </p>
        <p>
          &ldquo;French&rdquo; is a category error. There is France French, and
          there is the French that Shopify Montréal, Lightspeed, and Element AI
          actually write &mdash; warm, direct, code-switching, keeping English
          tech terms because that is how working bilinguals talk. Treating them
          as the same language produces output nobody in Montreal uses.
        </p>

        <h2><span className="n">01</span>The tells</h2>
        <p>
          You can pick a machine-translated FR explanation out of a lineup in
          under a second. The giveaways:
        </p>

        <div className="badrow">
          <div>
            <span className="tag">France French — off</span>
            <div><em>Nous vous prions de bien vouloir...</em></div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              Formal business register. Nobody in tech writes this.
            </div>
          </div>
          <div>
            <span className="tag">Québec — correct</span>
            <div><em>Regarde comment le hook se comporte...</em></div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              Direct, warm, keeps &ldquo;hook&rdquo; in English.
            </div>
          </div>
        </div>

        <div className="badrow">
          <div>
            <span className="tag">France French — off</span>
            <div>Une fonction de rappel (<em>callback</em>)</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              Translating technical terms makes code explanations harder to
              read, not easier.
            </div>
          </div>
          <div>
            <span className="tag">Québec — correct</span>
            <div>Un callback</div>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              Just the English word. That&rsquo;s what Québec devs call it.
            </div>
          </div>
        </div>

        <div className="pull">
          The prompt tells the model not to translate{" "}
          <em>hook, closure, callback, promise, state, effect, render, prop, thread</em>.
          Those are English words in Québec too.
        </div>

        <h2><span className="n">02</span>How I enforce it</h2>
        <p>
          Temperature 0, structured JSON via a Zod schema, and a negative-test
          blocklist that fails the build if the model slips into formal France
          French. A vitest suite runs five fixtures against the live model on
          every CI run.
        </p>
        <p>
          The blocklist is short and opinionated:{" "}
          <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--accent)" }}>courriel</code>,{" "}
          <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--accent)" }}>nous vous prions</code>,{" "}
          <code style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--accent)" }}>veuillez agréer</code>.
          Any of those in an FR response is a test failure.
        </p>

        <h2><span className="n">03</span>Why this matters for a portfolio</h2>
        <p>
          Anyone can wire a chat completion to a textarea. What separates
          working senior engineering from a demo is the discipline around the
          edges &mdash; the Zod schema, the dual strict/loose validation
          layers, the structured output at temperature 0, the fall-through
          error path that returns a proper 502 instead of a silent empty 200,
          the prompt-injection isolation via XML-tagged input.
        </p>
        <p>
          codeclair is a load-bearing surface for all of that. The bilingual
          register is the part a recruiter can feel. The rest is what makes it
          ship.
        </p>

        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--muted-2)",
          }}
        >
          <span>— Arshia Hamidi · Montréal</span>
          <span style={{ color: "var(--muted-3)" }}>/</span>
          <a href="mailto:arshiahamidi88@yahoo.com" style={{ color: "var(--muted)" }}>
            arshiahamidi88@yahoo.com
          </a>
          <a
            href="https://linkedin.com/in/arshiahamidi"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--muted)" }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ashthedaddy"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--muted)" }}
          >
            GitHub
          </a>
        </div>
      </article>
    </div>
  );
}
