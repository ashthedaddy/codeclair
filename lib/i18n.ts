import type { Language } from "./systemPrompt";

export interface Strings {
  nav: { reader: string; examples: string; dossier: string };
  hero: {
    dossier: string; mtl: string; tagline: string;
    headline: string[]; accentWordIndex: number;
    dekBefore: string; dekStrong: string; dekAfter: string;
    tryIt: string; source: string;
    metrics: { stream: string; temp: string; langs: string };
    spec: {
      output: string; stream: string; summary: string; risks: string;
      time: string; space: string;
      specSummaryBefore: string; specSummaryEmph: string; specSummaryAfter: string;
      risk1a: string; risk1codeName: string; risk1b: string;
      risk2: string;
    };
  };
  tool: {
    section: string; title: string;
    diff: string; share: string;
    try: string; input: string; chars: string;
    explain: string; outputKicker: string;
    streaming: string; done: string; steps: string; error: string;
    empty: { pre: string; explain: string; post: string };
    errorKicker: string;
    sec: { summary: string; walkthrough: string; complexity: string; risks: string; tests: string };
    stepsMeta: string; noted: string; timeLabel: string; spaceLabel: string;
  };
  gallery: {
    dossier: string; archive: string;
    titleBefore: string; titleEm: string; titleAfter: string;
    dek: string; filter: string;
  };
  about: {
    brow: string;
    titleBefore: string; titleEm: string;
    lede: string;
    p1: string; p2: string;
    h1: string;
    tells: string;
    badA1tag: string; badA1line: string; badA1note: string;
    badB1tag: string; badB1line: string; badB1note: string;
    badA2tag: string; badA2line: string; badA2note: string;
    badB2tag: string; badB2line: string; badB2note: string;
    pull: string;
    h2: string;
    enforce1: string; enforce2a: string; enforce2b: string;
    h3: string;
    portfolio1: string; portfolio2: string;
    sig: string;
  };
  share: {
    title: string; close: string; cardTitle: string;
    fileFoot: string; copy: string; download: string;
  };
  footer: { left: string; right: string };
}

const EN: Strings = {
  nav: { reader: "Reader", examples: "Examples", dossier: "Dossier" },
  hero: {
    dossier: "Dossier N° 001", mtl: "MTL", tagline: "Bilingual Code Reader",
    headline: ["Read", "any", "code", "the", "way", "a", "senior", "would."],
    accentWordIndex: 6,
    dekBefore: "Paste a snippet. Get the walkthrough, Big-O, the risks a junior reader would miss, and the tests you\u2019d write before shipping \u2014",
    dekStrong: " in English or Québec French",
    dekAfter: ", streamed in about ten seconds.",
    tryIt: "Try it on a snippet", source: "Source on GitHub",
    metrics: { stream: "Stream", temp: "Temp", langs: "Langs" },
    spec: {
      output: "output", stream: "stream", summary: "Summary", risks: "Risks",
      time: "Time", space: "Space",
      specSummaryBefore: "A hook that waits until the caller stops changing a value for ",
      specSummaryEmph: "delay",
      specSummaryAfter: " ms, then commits it. Standard search-box pattern.",
      risk1a: "Stale closure if ", risk1codeName: "value", risk1b: " is an object literal",
      risk2: "Initial render commits raw value \u2014 intentional",
    },
  },
  tool: {
    section: "Section 02", title: "The reading room.",
    diff: "EN · FR diff", share: "Share as image",
    try: "Try:", input: "Input", chars: "chars",
    explain: "Explain this snippet", outputKicker: "Output · explanation",
    streaming: "streaming", done: "done", steps: "steps", error: "model error",
    empty: {
      pre: "Paste a snippet on the left and hit ", explain: "Explain",
      post: ". You\u2019ll get a plain-language walkthrough, Big-O, risks to watch, and tests to write \u2014 streamed in ~10 seconds.",
    },
    errorKicker: "Error",
    sec: { summary: "Summary", walkthrough: "Walkthrough", complexity: "Complexity", risks: "Risks", tests: "Tests to write" },
    stepsMeta: "steps", noted: "noted", timeLabel: "Time", spaceLabel: "Space",
  },
  gallery: {
    dossier: "Dossier N° 002", archive: "Archive",
    titleBefore: "A library of ", titleEm: "read", titleAfter: " code.",
    dek: "Every explanation codeclair has produced, permalinked and searchable. Browse by language or by the kind of bug that lives in it. Click any card to re-open it in the reader.",
    filter: "Filter:",
  },
  about: {
    brow: "Dossier N° 003 · Note from the author",
    titleBefore: "Why \u201cFrench\u201d ", titleEm: "isn\u2019t a language.",
    lede: "Every bilingual tool I\u2019ve used treats Québec like a rounding error. A Montreal reader clocks a Paris opener in half a second and stops trusting the output. codeclair is the fix.",
    p1: "I built codeclair in three evenings because I wanted a tool that explained code the way a senior engineer would \u2014 and because I wanted that explanation in my own register, not someone else\u2019s.",
    p2: "\u201cFrench\u201d is a category error. There is France French, and there is the French that Shopify Montréal, Lightspeed, and Element AI actually write \u2014 warm, direct, code-switching, keeping English tech terms because that is how working bilinguals talk. Treating them as the same language produces output nobody in Montreal uses.",
    h1: "The tells",
    tells: "You can pick a machine-translated FR explanation out of a lineup in under a second. The giveaways:",
    badA1tag: "France French — off", badA1line: "Nous vous prions de bien vouloir...", badA1note: "Formal business register. Nobody in tech writes this.",
    badB1tag: "Québec — correct", badB1line: "Regarde comment le hook se comporte...", badB1note: "Direct, warm, keeps \u201chook\u201d in English.",
    badA2tag: "France French — off", badA2line: "Une fonction de rappel (callback)", badA2note: "Translating technical terms makes code explanations harder to read, not easier.",
    badB2tag: "Québec — correct", badB2line: "Un callback", badB2note: "Just the English word. That\u2019s what Québec devs call it.",
    pull: "The prompt tells the model not to translate hook, closure, callback, promise, state, effect, render, prop, thread. Those are English words in Québec too.",
    h2: "How I enforce it",
    enforce1: "Temperature 0, structured JSON via a Zod schema, and a negative-test blocklist that fails the build if the model slips into formal France French. A vitest suite runs five fixtures against the live model on every CI run.",
    enforce2a: "The blocklist is short and opinionated: ",
    enforce2b: ". Any of those in an FR response is a test failure.",
    h3: "Why this matters for a portfolio",
    portfolio1: "Anyone can wire a chat completion to a textarea. What separates working senior engineering from a demo is the discipline around the edges \u2014 the Zod schema, the dual strict/loose validation layers, the structured output at temperature 0, the fall-through error path that returns a proper 502 instead of a silent empty 200, the prompt-injection isolation via XML-tagged input.",
    portfolio2: "codeclair is a load-bearing surface for all of that. The bilingual register is the part a recruiter can feel. The rest is what makes it ship.",
    sig: "— Arshia Hamidi · Montréal",
  },
  share: {
    title: "Share as image", close: "Close",
    cardTitle: "A hook that waits for quiet, then commits.",
    fileFoot: "useDebounce.ts · TypeScript · EN · codeclair-mtl.vercel.app",
    copy: "Copy link", download: "Download PNG",
  },
  footer: { left: "Mtl", right: "AI SDK v6 · Next.js 16 · Fluid Compute" },
};

const FR: Strings = {
  nav: { reader: "Lecteur", examples: "Exemples", dossier: "Dossier" },
  hero: {
    dossier: "Dossier N° 001", mtl: "MTL", tagline: "Lecteur de code bilingue",
    headline: ["Lis", "n\u2019importe", "quel", "code", "comme", "un", "senior", "le ferait."],
    accentWordIndex: 6,
    dekBefore: "Colle un snippet. Reçois le walkthrough, le Big-O, les risques qu\u2019un lecteur junior manquerait, et les tests à écrire avant de ship \u2014",
    dekStrong: " en anglais ou en français québécois",
    dekAfter: ", streamé en une dizaine de secondes.",
    tryIt: "Essaie sur un snippet", source: "Source sur GitHub",
    metrics: { stream: "Stream", temp: "Temp", langs: "Langues" },
    spec: {
      output: "output", stream: "stream", summary: "Résumé", risks: "Risques",
      time: "Temps", space: "Espace",
      specSummaryBefore: "Un hook qui attend que l\u2019appelant arrête de changer une valeur pendant ",
      specSummaryEmph: "delay",
      specSummaryAfter: " ms, puis la commet. Pattern classique pour un champ de recherche.",
      risk1a: "Stale closure si ", risk1codeName: "value", risk1b: " est un objet littéral",
      risk2: "Le premier render commet la valeur brute \u2014 voulu",
    },
  },
  tool: {
    section: "Section 02", title: "La salle de lecture.",
    diff: "EN · FR diff", share: "Partager en image",
    try: "Essaie :", input: "Entrée", chars: "car.",
    explain: "Expliquer ce snippet", outputKicker: "Sortie · explication",
    streaming: "streaming", done: "terminé", steps: "étapes", error: "erreur modèle",
    empty: {
      pre: "Colle un snippet à gauche et clique ", explain: "Expliquer",
      post: ". Tu reçois un walkthrough en langage clair, le Big-O, les risques à surveiller et les tests à écrire \u2014 streamé en ~10 secondes.",
    },
    errorKicker: "Erreur",
    sec: { summary: "Résumé", walkthrough: "Walkthrough", complexity: "Complexité", risks: "Risques", tests: "Tests à écrire" },
    stepsMeta: "étapes", noted: "notés", timeLabel: "Temps", spaceLabel: "Espace",
  },
  gallery: {
    dossier: "Dossier N° 002", archive: "Archives",
    titleBefore: "Une librairie de code ", titleEm: "lu", titleAfter: ".",
    dek: "Chaque explication que codeclair a produite, permalinkée et cherchable. Browse par langage ou par le type de bug qui vit dedans. Clique une carte pour la ré-ouvrir dans le lecteur.",
    filter: "Filtre :",
  },
  about: {
    brow: "Dossier N° 003 · Note de l\u2019auteur",
    titleBefore: "Pourquoi le « français » ", titleEm: "n\u2019est pas une langue.",
    lede: "Chaque outil bilingue que j\u2019ai utilisé traite le Québec comme une erreur d\u2019arrondi. Un lecteur montréalais clocke une intro parisienne en une demi-seconde et arrête de faire confiance à la sortie. codeclair règle ça.",
    p1: "J\u2019ai bâti codeclair en trois soirées parce que je voulais un outil qui explique le code comme un senior le ferait \u2014 et parce que je voulais cette explication dans mon registre, pas celui de quelqu\u2019un d\u2019autre.",
    p2: "« Français » est une erreur de catégorie. Il y a le français de France, et il y a le français que Shopify Montréal, Lightspeed et Element AI écrivent vraiment \u2014 chaleureux, direct, code-switché, qui garde les termes techniques anglais parce que c\u2019est comme ça que les bilingues du milieu parlent. Les traiter comme la même langue produit une sortie que personne à Montréal n\u2019utilise.",
    h1: "Les signes",
    tells: "Tu peux reconnaître une explication FR machine-traduite en moins d\u2019une seconde. Les signes :",
    badA1tag: "Français de France — off", badA1line: "Nous vous prions de bien vouloir...", badA1note: "Registre business formel. Personne en tech n\u2019écrit ça.",
    badB1tag: "Québec — correct", badB1line: "Regarde comment le hook se comporte...", badB1note: "Direct, chaleureux, garde « hook » en anglais.",
    badA2tag: "Français de France — off", badA2line: "Une fonction de rappel (callback)", badA2note: "Traduire les termes techniques rend les explications de code plus dures à lire, pas plus faciles.",
    badB2tag: "Québec — correct", badB2line: "Un callback", badB2note: "Juste le mot anglais. C\u2019est comme ça que les devs québécois disent.",
    pull: "Le prompt dit au modèle de ne pas traduire hook, closure, callback, promise, state, effect, render, prop, thread. Ce sont des mots anglais au Québec aussi.",
    h2: "Comment je l\u2019enforce",
    enforce1: "Temperature 0, JSON structuré via un Zod schema, et une blocklist de tests négatifs qui fait fail le build si le modèle slip dans le français de France formel. Une suite vitest roule cinq fixtures contre le vrai modèle à chaque CI run.",
    enforce2a: "La blocklist est courte et opinionée : ",
    enforce2b: ". N\u2019importe lequel dans une réponse FR, c\u2019est un test qui fail.",
    h3: "Pourquoi ça compte pour un portfolio",
    portfolio1: "N\u2019importe qui peut brancher un chat completion sur un textarea. Ce qui sépare un vrai travail de senior d\u2019une démo, c\u2019est la discipline dans les marges \u2014 le Zod schema, les deux couches strict/loose, le structured output à température 0, le chemin d\u2019erreur qui retourne un vrai 502 au lieu d\u2019un 200 vide silencieux, l\u2019isolation prompt-injection via input balisé XML.",
    portfolio2: "codeclair est une surface load-bearing pour tout ça. Le registre bilingue, c\u2019est la partie qu\u2019un recruiter peut sentir. Le reste, c\u2019est ce qui fait que ça ship.",
    sig: "— Arshia Hamidi · Montréal",
  },
  share: {
    title: "Partager en image", close: "Fermer",
    cardTitle: "Un hook qui attend le silence, puis commet.",
    fileFoot: "useDebounce.ts · TypeScript · FR · codeclair-mtl.vercel.app",
    copy: "Copier le lien", download: "Télécharger PNG",
  },
  footer: { left: "Mtl", right: "AI SDK v6 · Next.js 16 · Fluid Compute" },
};

export function t(lang: Language): Strings {
  return lang === "fr" ? FR : EN;
}
