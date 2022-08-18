import { useState } from "react";

export interface UseSearchHook {
  readonly rawQuery: string;
  readonly cleanQuery: string;
  readonly prevQuery: string;
  readonly setQuery: (query: string) => void;
  readonly setSearched: () => void;
}

export function useSearch(initialQuery: string): UseSearchHook {
  const cleanInitialQuery = removeSpaces(initialQuery);
  const [{ rawQuery, cleanQuery, prevQuery }, setQueryState] = useState({
    rawQuery: initialQuery,
    cleanQuery: cleanInitialQuery,
    prevQuery: cleanInitialQuery,
  });

  const setQuery = (query: string) => {
    setQueryState((prev) => ({
      ...prev,
      rawQuery: query,
      cleanQuery: removeSpaces(query),
    }));
  };

  const setSearched = () => {
    setQueryState((prev) => ({
      ...prev,
      prevQuery: prev.cleanQuery,
    }));
  };

  return {
    rawQuery,
    cleanQuery,
    prevQuery,
    setQuery,
    setSearched,
  };
}

function removeSpaces(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}
