import { useRouter } from "next/router";
import { SearchResult, SearchResults } from "query-registry";
import useSWR from "swr";

// Supports CORS
const searchAPIEndpoint = "https://registry.npmjs.org/-/v1/search";

export interface UseSearchPackagesHook {
  readonly query?: string;
  readonly searchResults?: SearchResult[];
  readonly error: any;
}

export function useSearchPackages(): UseSearchPackagesHook {
  const query = useQuery();
  const { data: searchResults, error } = useSWR(
    query ? `${searchAPIEndpoint}?text=${query}` : null,
    fetcher
  );

  return { query, searchResults, error };
}

function useQuery(): string | undefined {
  const router = useRouter();
  const rawQuery = router.query.query;

  if (!rawQuery || !(typeof rawQuery === "string")) {
    return undefined;
  }

  const query = rawQuery.trim();
  if (!query.length) {
    return undefined;
  }

  return query;
}

async function fetcher(url: string): Promise<SearchResult[]> {
  const data = await fetch(url);
  const json = await data.json();
  const { objects: searchResults } = json as SearchResults;
  return searchResults;
}
