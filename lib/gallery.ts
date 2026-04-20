export interface GalleryItem {
  id: string;
  tag: string;
  lang: "en" | "fr";
  title: string;
  summary: string;
  time: string;
  risks: number;
  date: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "debounce", tag: "TS · HOOK", lang: "en",
    title: "A debounce hook, and why your search box keeps firing twice",
    summary: "Classic React pattern with a subtle re-render trap. Walks through why `useRef` + `useCallback` look safe but leak state between commits.",
    time: "8s", risks: 2, date: "Apr 12",
  },
  {
    id: "fib", tag: "PY · BUG", lang: "en",
    title: "fib(n, memo={}) — the default-argument bug that works",
    summary: "Why this 'correct-looking' memoization is actually wrong. Spoiler: the dict is shared across every call that omits the argument.",
    time: "11s", risks: 3, date: "Apr 11",
  },
  {
    id: "sql", tag: "SQL · QUERY", lang: "en",
    title: "LEFT JOIN + HAVING > 0 — the query that lies",
    summary: "A 30-day cohort query that looks inclusive but secretly filters itself. The planner doesn't care; the reader should.",
    time: "9s", risks: 2, date: "Apr 10",
  },
  {
    id: "go-pool", tag: "GO · CONC", lang: "fr",
    title: "Pool de workers : le leak que tu vois pas",
    summary: "Un worker Go canonique qui marche en prod jusqu'à ce qu'un producer ne ferme pas son channel. Analyse en français québécois.",
    time: "12s", risks: 2, date: "Apr 09",
  },
  {
    id: "rust-drop", tag: "RUST · LIFETIME", lang: "en",
    title: "Why your RAII guard drops at the wrong time",
    summary: "Temporaries in `if let` bindings live for the whole block, not just the binding. A 4-line deadlock explained.",
    time: "10s", risks: 3, date: "Apr 08",
  },
  {
    id: "next-cache", tag: "NEXT · CACHE", lang: "en",
    title: "`revalidate: 0` doesn't mean what you think",
    summary: "The App Router cache tiers, in order, and which one bites you when your 'dynamic' route returns stale data.",
    time: "9s", risks: 4, date: "Apr 07",
  },
  {
    id: "js-equals", tag: "JS · GOTCHA", lang: "fr",
    title: "[] == ![] — la blague qui est vraiment dans la spec",
    summary: "La cascade de coercion qui rend ça `true`. Expliqué étape par étape, avec les morceaux de la spec ECMA numérotés.",
    time: "7s", risks: 0, date: "Apr 06",
  },
  {
    id: "css-stacking", tag: "CSS · LAYOUT", lang: "en",
    title: "Why z-index: 9999 isn't winning",
    summary: "Stacking contexts, and the transform: translateZ(0) on a parent that's quietly capping your modal's layer.",
    time: "8s", risks: 1, date: "Apr 04",
  },
  {
    id: "py-gil", tag: "PY · PERF", lang: "en",
    title: "Your ThreadPoolExecutor isn't parallel",
    summary: "When the GIL hurts, when it doesn't, and why NumPy seems to ignore it. With a 12-line benchmark to prove it.",
    time: "11s", risks: 2, date: "Apr 02",
  },
];
