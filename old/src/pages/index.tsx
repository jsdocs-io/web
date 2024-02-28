import NextHead from "next/head";
import Layout from "../components/common/Layout";
import PackageLink from "../components/common/PackageLink";
import SearchBar from "../components/common/SearchBar";

const IndexPage = () => {
  const pageTitle = "jsDocs.io";
  const pageDescription =
    "jsDocs.io is a documentation host for Javascript and Typescript packages published on npm";

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.jsdocs.io" />

        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
      </NextHead>

      <Layout>
        <div className="flex flex-col items-center h-screen space-y-4 sm:h-full">
          <img className="h-32" src="/logo.png" alt="jsDocs.io logo" />

          <div className="w-full sm:w-2/3 lg:w-1/2">
            <SearchBar />
          </div>

          <p className="text-center">
            Try with <PackageLink name="faastjs">faastjs</PackageLink>,{" "}
            <PackageLink name="query-registry">query-registry</PackageLink> or{" "}
            <PackageLink name="prettier">prettier</PackageLink>.
          </p>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
