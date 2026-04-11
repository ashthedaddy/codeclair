export const SAMPLE_CODE_USE_DEBOUNCE = `import { useEffect, useState } from "react";

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
