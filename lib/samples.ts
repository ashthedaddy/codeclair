export type SampleId = "use-debounce" | "memo-fib" | "lifetime-value-sql";

export interface Sample {
  id: SampleId;
  label: string;
  tag: string;
  code: string;
}

const USE_DEBOUNCE_CODE = `import { useEffect, useState } from "react";

/**
 * useDebounce
 *
 * Delays updates to a value until \`delay\` ms have passed without a
 * new change. Typical use: wait until the user has stopped typing
 * before firing a search request.
 *
 * @param value  the value to debounce
 * @param delay  debounce window in milliseconds
 * @param onFlush optional callback invoked with the debounced value
 *                every time it settles
 */
export function useDebounce<T>(
  value: T,
  delay: number,
  onFlush?: (value: T) => void,
): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
      if (onFlush) onFlush(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// Example usage inside a search box:
//
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 300, (q) => {
//     console.log("searching for", q);
//   });
//
//   useEffect(() => {
//     if (!debouncedQuery) return;
//     fetch(\`/api/search?q=\${encodeURIComponent(debouncedQuery)}\`);
//   }, [debouncedQuery]);
`;

const MEMO_FIB_CODE = `def fib(n, memo={}):
    """
    Return the n-th Fibonacci number using memoization.

    Uses a dict as a cache so repeated calls are fast.
    """
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]


# Usage:
#
#   print(fib(50))   # fast — cached
#   print(fib(100))  # also fast — reuses earlier work
#
# But the memo dict persists across ALL calls to fib(), even
# from different call sites or different modules that import
# this file. That's either a feature or a bug, depending on
# whether you expected it.
`;

const LIFETIME_VALUE_SQL_CODE = `-- Top 100 recent signups ranked by lifetime value.
SELECT
  u.id,
  u.email,
  (SELECT COUNT(*)
     FROM orders o
    WHERE o.user_id = u.id)               AS order_count,
  (SELECT COALESCE(SUM(o.amount), 0)
     FROM orders o
    WHERE o.user_id = u.id)               AS lifetime_value,
  (SELECT MAX(o.created_at)
     FROM orders o
    WHERE o.user_id = u.id)               AS last_order_at
FROM users u
WHERE u.created_at > NOW() - INTERVAL '30 days'
ORDER BY lifetime_value DESC NULLS LAST
LIMIT 100;
`;

export const SAMPLES: Sample[] = [
  {
    id: "use-debounce",
    label: "React hook",
    tag: "TSX",
    code: USE_DEBOUNCE_CODE,
  },
  {
    id: "memo-fib",
    label: "Python recursion",
    tag: "PY",
    code: MEMO_FIB_CODE,
  },
  {
    id: "lifetime-value-sql",
    label: "SQL quadratic",
    tag: "SQL",
    code: LIFETIME_VALUE_SQL_CODE,
  },
];

export function getSample(id: SampleId): Sample {
  const sample = SAMPLES.find((s) => s.id === id);
  if (!sample) throw new Error(`Unknown sample id: ${id}`);
  return sample;
}

export const SAMPLE_CODE_USE_DEBOUNCE = USE_DEBOUNCE_CODE;
