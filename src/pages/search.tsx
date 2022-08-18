import NextHead from "next/head";
import { Layout } from "../components/common/Layout";
import { SearchBar } from "../components/common/SearchBar";
import SearchResults from "../components/search/SearchResults";
import { useSearchPackages } from "../hooks/useSearchPackages";
import Page404 from "./404";

const SearchPage = () => {
  const { query, searchResults, error } = useSearchPackages();

  if (error || !query) {
    return <Page404 />;
  }

  const pageTitle = `${query} - jsDocs.io`;
  const pageDescription = `Search results for '${query}' on jsDocs.io`;

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.jsdocs.io/search" />

        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
      </NextHead>

      <Layout>
        <div className="flex justify-center">
          <div className="w-full space-y-12 lg:w-2/3">
            <SearchBar initialQuery={query} />

            <SearchResults searchResults={searchResults} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchPage;
