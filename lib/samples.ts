export type SampleLang = "ts" | "py" | "sql" | "go";

export interface CannedWalk {
  anchor: string;
  lines: [number, number];
  exp: string;
}

export interface CannedRisk {
  sev: "high" | "medium" | "low";
  title: string;
  detail: string;
}

export interface CannedExplanation {
  summary: string;
  walkthrough: CannedWalk[];
  complexity: { time: string; space: string; notes: string };
  risks: CannedRisk[];
  tests: string[];
}

export interface Sample {
  id: string;
  tag: string;
  label: string;
  lang: SampleLang;
  filename: string;
  code: string;
  explanation: { en: CannedExplanation; fr: CannedExplanation };
}

export const SAMPLES: Sample[] = [
  {
    id: "useDebounce",
    tag: "TS · HOOK",
    label: "useDebounce",
    lang: "ts",
    filename: "useDebounce.ts",
    code: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    explanation: {
      en: {
        summary:
          "A React hook that waits until the caller stops changing a value for `delay` ms, then commits it. Standard search-box pattern — avoids firing a network request on every keystroke.",
        walkthrough: [
          { anchor: "Signature", lines: [3, 3], exp: "Generic over the value type, returns the same type. Consumers get full type inference without a cast." },
          { anchor: "Local mirror state", lines: [4, 4], exp: "Tracks the debounced copy. Initialized to the current value so first render is not empty." },
          { anchor: "Timer effect", lines: [6, 10], exp: "Each time value or delay changes, schedule a commit. If they change again before the timer fires, the cleanup cancels it — the classic debounce." },
          { anchor: "Return value", lines: [14, 14], exp: "The mirror, never the raw value. Callers read it like any other piece of state; re-renders happen only when the timer fires." },
        ],
        complexity: { time: "O(1)", space: "O(1)", notes: "Per update: one timer allocation, one cleanup closure. No queue, no batch, no re-render storm." },
        risks: [
          { sev: "medium", title: "Stale closure if value is an object literal", detail: "Each render creates a new object identity, so the effect re-runs every render and the debounce never settles. Memoize upstream." },
          { sev: "low", title: "Initial render commits raw value", detail: "By design — but surprising if you assumed 'debounced' means 'always delayed'." },
        ],
        tests: [
          "Returns the initial value on first render",
          "Commits the latest value after `delay` ms of quiet",
          "Cancels pending commit when value changes again",
          "Respects a changing `delay` (timer resets)",
          "Cleans up on unmount without a warning",
        ],
      },
      fr: {
        summary:
          "Un hook React qui attend que l'appelant arrête de changer une valeur pendant `delay` ms, puis la commet. Pattern classique pour les champs de recherche — évite de déclencher une requête réseau à chaque frappe.",
        walkthrough: [
          { anchor: "Signature", lines: [3, 3], exp: "Générique sur le type de valeur, retourne le même type. L'appelant récupère l'inférence de type sans cast." },
          { anchor: "State miroir", lines: [4, 4], exp: "Garde la copie débouncée. Initialisée à la valeur courante pour que le premier render ne soit pas vide." },
          { anchor: "Effect du timer", lines: [6, 10], exp: "Chaque fois que value ou delay change, on planifie un commit. S'ils changent à nouveau avant le timer, le cleanup l'annule — le debounce classique." },
          { anchor: "Valeur retournée", lines: [14, 14], exp: "Le miroir, jamais la valeur brute. L'appelant la lit comme n'importe quel state; les re-renders n'arrivent que quand le timer tire." },
        ],
        complexity: { time: "O(1)", space: "O(1)", notes: "Par update: un setTimeout, une closure de cleanup. Pas de queue, pas de batch, pas de cascade de re-renders." },
        risks: [
          { sev: "medium", title: "Stale closure si value est un objet littéral", detail: "Chaque render crée une nouvelle identité d'objet, donc l'effect re-tourne à chaque render et le debounce ne se stabilise jamais. Memoize en amont." },
          { sev: "low", title: "Le premier render commet la valeur brute", detail: "Par design — mais surprenant si tu supposais que 'debounced' veut dire 'toujours délayé'." },
        ],
        tests: [
          "Retourne la valeur initiale au premier render",
          "Commet la dernière valeur après `delay` ms de silence",
          "Annule le commit pendant si value change à nouveau",
          "Respecte un `delay` qui change (le timer reset)",
          "Cleanup au unmount sans warning",
        ],
      },
    },
  },
  {
    id: "memoFib",
    tag: "PY · BUG",
    label: "memoized fib",
    lang: "py",
    filename: "fib.py",
    code: `def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]`,
    explanation: {
      en: {
        summary:
          "A recursive Fibonacci with naive memoization. Returns the n-th Fibonacci number in linear time. Contains a classic Python footgun — the mutable default argument.",
        walkthrough: [
          { anchor: "Mutable default", lines: [1, 1], exp: "`memo={}` is evaluated once at function definition, not per call. Every invocation without an explicit memo shares the same dict — correctness works by accident here but leaks state across calls." },
          { anchor: "Cache lookup", lines: [2, 3], exp: "Short-circuit on hit. First real optimization." },
          { anchor: "Base case", lines: [4, 5], exp: "fib(0)=0, fib(1)=1. No memoization needed for these." },
          { anchor: "Recursive step", lines: [6, 7], exp: "Standard fib(n-1) + fib(n-2), stored before return. The shared memo makes this O(n) amortized instead of O(2^n)." },
        ],
        complexity: { time: "O(n) amortized", space: "O(n)", notes: "Each n computed once and cached. Recursion depth O(n) — Python default limit is 1000, so fib(1001) crashes." },
        risks: [
          { sev: "high", title: "Mutable default argument", detail: "The memo dict is shared across ALL calls that omit the argument. State leaks between unrelated callers and across tests." },
          { sev: "medium", title: "RecursionError at n ≥ 1000", detail: "Python recursion limit. Use an iterative loop or sys.setrecursionlimit for large n." },
        ],
        tests: [
          "Returns 0 for fib(0) and 1 for fib(1)",
          "Returns 55 for fib(10)",
          "Two independent callers do NOT share cache (currently fails)",
          "Passing a fresh memo isolates state",
          "fib(999) returns without hitting recursion limit",
        ],
      },
      fr: {
        summary:
          "Une Fibonacci récursive avec memoization naïve. Retourne le n-ième nombre de Fibonacci en temps linéaire. Contient le footgun Python classique — le default argument mutable.",
        walkthrough: [
          { anchor: "Default mutable", lines: [1, 1], exp: "`memo={}` est évalué une seule fois à la définition, pas par call. Chaque invocation sans memo explicite partage le même dict — ça marche ici par accident, mais l'état fuit entre les appels." },
          { anchor: "Cache lookup", lines: [2, 3], exp: "Short-circuit sur hit. La vraie optimisation." },
          { anchor: "Cas de base", lines: [4, 5], exp: "fib(0)=0, fib(1)=1. Pas besoin de memoization pour ceux-là." },
          { anchor: "Étape récursive", lines: [6, 7], exp: "fib(n-1) + fib(n-2) standard, stocké avant le return. Le memo partagé rend ça O(n) amorti au lieu de O(2^n)." },
        ],
        complexity: { time: "O(n) amorti", space: "O(n)", notes: "Chaque n calculé une fois et caché. Profondeur de récursion O(n) — la limite Python par défaut est 1000, donc fib(1001) crash." },
        risks: [
          { sev: "high", title: "Default argument mutable", detail: "Le dict memo est partagé entre TOUS les appels qui omettent l'argument. L'état fuit entre des callers non-reliés et entre les tests." },
          { sev: "medium", title: "RecursionError à n ≥ 1000", detail: "Limite de récursion Python. Utilise une loop itérative ou sys.setrecursionlimit pour grand n." },
        ],
        tests: [
          "Retourne 0 pour fib(0) et 1 pour fib(1)",
          "Retourne 55 pour fib(10)",
          "Deux callers indépendants ne partagent PAS le cache (fail actuellement)",
          "Passer un memo fresh isole l'état",
          "fib(999) retourne sans hit la limite de récursion",
        ],
      },
    },
  },
  {
    id: "sqlJoin",
    tag: "SQL · QUERY",
    label: "user metrics",
    lang: "sql",
    filename: "metrics.sql",
    code: `SELECT u.id, u.email, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 0
ORDER BY orders DESC
LIMIT 50;`,
    explanation: {
      en: {
        summary:
          "Returns the top 50 most active users who signed up in the last 30 days, with their order count. LEFT JOIN is doing nothing useful here — the HAVING clause filters it back to an effective INNER JOIN.",
        walkthrough: [
          { anchor: "Select list", lines: [1, 1], exp: "User identity plus a derived count. COUNT(o.id) counts orders; COUNT(*) would count matched rows including the NULL from an empty left join — important distinction." },
          { anchor: "Left join", lines: [3, 3], exp: "Preserves users with zero orders... except HAVING > 0 drops them anyway. This should be INNER JOIN for clarity and speed." },
          { anchor: "Date window", lines: [4, 4], exp: "30-day cohort. Uses Postgres INTERVAL syntax — not portable to MySQL." },
          { anchor: "Group + filter + order", lines: [5, 8], exp: "Grouped at user grain. HAVING filters post-aggregation. ORDER BY on the alias works in Postgres and MySQL; not in older SQL Server." },
        ],
        complexity: { time: "O(n log n)", space: "O(n)", notes: "n = users in 30-day window. Dominant cost is the sort for ORDER BY. A composite index on users(created_at, id) + orders(user_id) helps." },
        risks: [
          { sev: "medium", title: "LEFT JOIN + HAVING > 0 is misleading", detail: "Reader has to do double work to realize users with zero orders are filtered out. Switch to INNER JOIN." },
          { sev: "low", title: "Dialect-specific INTERVAL syntax", detail: "Breaks on MySQL / SQL Server. Use a parameter or a dialect abstraction." },
        ],
        tests: [
          "Returns empty set when no users in window",
          "Ranks by order count descending",
          "Caps result at 50 rows",
          "Users with 0 orders are excluded",
          "Ties broken deterministically (currently not — add id tiebreaker)",
        ],
      },
      fr: {
        summary:
          "Retourne les 50 users les plus actifs qui se sont inscrits dans les 30 derniers jours, avec leur nombre de commandes. Le LEFT JOIN ne sert à rien ici — le HAVING le ramène à un INNER JOIN effectif.",
        walkthrough: [
          { anchor: "Select list", lines: [1, 1], exp: "Identité du user plus un count dérivé. COUNT(o.id) compte les orders; COUNT(*) compterait les rows matchées incluant le NULL d'un left join vide — distinction importante." },
          { anchor: "Left join", lines: [3, 3], exp: "Préserve les users avec zéro orders... sauf que HAVING > 0 les drop quand même. Ça devrait être INNER JOIN pour la clarté et la vitesse." },
          { anchor: "Fenêtre de date", lines: [4, 4], exp: "Cohorte de 30 jours. Utilise la syntaxe INTERVAL de Postgres — pas portable à MySQL." },
          { anchor: "Group + filter + order", lines: [5, 8], exp: "Grouped au grain user. HAVING filtre post-aggregation. ORDER BY sur l'alias marche dans Postgres et MySQL; pas dans les vieux SQL Server." },
        ],
        complexity: { time: "O(n log n)", space: "O(n)", notes: "n = users dans la fenêtre de 30 jours. Le coût dominant est le sort du ORDER BY. Un index composite sur users(created_at, id) + orders(user_id) aide." },
        risks: [
          { sev: "medium", title: "LEFT JOIN + HAVING > 0 est trompeur", detail: "Le reader doit faire du double travail pour réaliser que les users avec zéro orders sont filtrés. Switch à INNER JOIN." },
          { sev: "low", title: "Syntaxe INTERVAL spécifique au dialecte", detail: "Break sur MySQL / SQL Server. Utilise un param ou une abstraction de dialecte." },
        ],
        tests: [
          "Retourne un set vide quand il n'y a pas de users dans la fenêtre",
          "Rank par order count descendant",
          "Cap le résultat à 50 rows",
          "Les users avec 0 orders sont exclus",
          "Ties cassés de façon déterministe (pas actuellement — add tiebreaker id)",
        ],
      },
    },
  },
  {
    id: "goPool",
    tag: "GO · CONCURRENCY",
    label: "worker pool",
    lang: "go",
    filename: "pool.go",
    code: `func work(jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {
    defer wg.Done()
    for j := range jobs {
        r, err := process(j)
        if err != nil {
            continue
        }
        results <- r
    }
}`,
    explanation: {
      en: {
        summary:
          "A worker goroutine that pulls from a jobs channel, processes each job, and sends successful results to a results channel. Uses a WaitGroup so callers can wait for completion.",
        walkthrough: [
          { anchor: "Directional channels", lines: [1, 1], exp: "`<-chan Job` is receive-only, `chan<- Result` is send-only. Compiler enforces the contract — workers can't accidentally send to the jobs channel." },
          { anchor: "Deferred Done", lines: [2, 2], exp: "Fires when the range loop exits (channel closed). Idiomatic Go pattern; easy to miss if you're used to try/finally." },
          { anchor: "Range over channel", lines: [3, 3], exp: "Exits cleanly when the producer closes `jobs`. If the producer never closes, this worker leaks forever." },
          { anchor: "Silent error drop", lines: [5, 7], exp: "Errors are swallowed. Fine for best-effort batches; a silent data-loss bug for anything that needs accounting." },
        ],
        complexity: { time: "O(n · p)", space: "O(1) per worker", notes: "n = jobs, p = cost of process(). No internal buffering beyond the channels the caller supplies." },
        risks: [
          { sev: "high", title: "Silent error swallowing", detail: "Caller has no way to know a job failed. Either log with context, or send errors on a separate channel." },
          { sev: "medium", title: "Goroutine leak if jobs never closes", detail: "Worker blocks on range forever. Pair with context + select, or guarantee close in the caller." },
        ],
        tests: [
          "Processes all jobs when channel is closed",
          "Exits when WaitGroup Done is called from defer",
          "Errored jobs do not appear in results",
          "Closing jobs mid-run drains in-flight work",
          "Multiple workers can share both channels without race",
        ],
      },
      fr: {
        summary:
          "Une goroutine worker qui pull du channel jobs, traite chaque job, et envoie les résultats réussis sur un channel results. Utilise un WaitGroup pour que les callers puissent attendre la completion.",
        walkthrough: [
          { anchor: "Channels directionnels", lines: [1, 1], exp: "`<-chan Job` est receive-only, `chan<- Result` est send-only. Le compilateur enforce le contract — les workers peuvent pas accidentellement send sur le channel jobs." },
          { anchor: "Done en defer", lines: [2, 2], exp: "Fire quand la range loop exit (channel fermé). Pattern idiomatique Go; facile à manquer si t'es habitué au try/finally." },
          { anchor: "Range sur channel", lines: [3, 3], exp: "Exit cleanly quand le producer ferme `jobs`. Si le producer ne ferme jamais, ce worker leak pour toujours." },
          { anchor: "Drop d'erreurs silencieux", lines: [5, 7], exp: "Les erreurs sont swallowed. OK pour des batches best-effort; un bug silencieux de data-loss pour tout ce qui nécessite du accounting." },
        ],
        complexity: { time: "O(n · p)", space: "O(1) par worker", notes: "n = jobs, p = coût de process(). Pas de buffering interne au-delà des channels que le caller fournit." },
        risks: [
          { sev: "high", title: "Swallowing silencieux des erreurs", detail: "Le caller n'a aucun moyen de savoir qu'un job a failé. Soit log avec contexte, soit envoie les erreurs sur un channel séparé." },
          { sev: "medium", title: "Leak de goroutine si jobs ne ferme jamais", detail: "Le worker block sur range pour toujours. Pair avec context + select, ou garantis le close dans le caller." },
        ],
        tests: [
          "Traite tous les jobs quand le channel est fermé",
          "Exit quand WaitGroup Done est appelé depuis le defer",
          "Les jobs en erreur n'apparaissent pas dans results",
          "Fermer jobs en cours de run drain le travail en vol",
          "Plusieurs workers peuvent partager les deux channels sans race",
        ],
      },
    },
  },
];

export function getSample(id: string): Sample {
  const s = SAMPLES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown sample id: ${id}`);
  return s;
}

export const SAMPLE_CODE_USE_DEBOUNCE = SAMPLES[0].code;
