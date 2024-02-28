import NextHead from "next/head";
import A from "../components/common/A";
import CodeBlock from "../components/common/CodeBlock";
import DocComment from "../components/common/DocComment";
import InlineCode from "../components/common/InlineCode";
import Layout from "../components/common/Layout";
import PackageLink from "../components/common/PackageLink";
import {
  exampleDeclarationDoc,
  exampleDeclarationFile,
  exampleDeclarationSignature,
  exampleIndexFile,
  exampleOverview,
  exampleOverviewFile,
  examplePackageJSONFiles,
  exampleProjectStructure,
} from "../data/examples";

const GuidePage = () => {
  const pageTitle = "Package Documentation Guide - jsDocs.io";
  const pageDescription =
    "Documentation guide for packages displayed on jsDocs.io";

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.jsdocs.io/guide" />

        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
      </NextHead>

      <Layout>
        <article className="space-y-12">
          <IntroSection />
          <PackageAnalysisProcessSection />
          <SupportedPackagesSection />
          <IncludingTypeDefinitionFilesSection />
          <IndexFileSection />
          <PackageOverviewSection />
          <PackageDeclarationsSection />
          <ExamplePackagesSection />
        </article>
      </Layout>
    </>
  );
};

const IntroSection = () => {
  return (
    <section>
      <h1>Package Documentation Guide</h1>

      <p>
        This guide explains how you can improve the documentation of your
        packages as displayed on jsDocs.io.
      </p>
    </section>
  );
};

const PackageAnalysisProcessSection = () => {
  return (
    <section className="space-y-2">
      <h2>Package Analysis Process</h2>

      <p>
        Visiting the documentation page for a package (for example,{" "}
        <InlineCode code="jsdocs.io/package/foo" />) starts the following
        analysis process:
      </p>

      <ol className="pl-8 space-y-1 list-decimal">
        <li>
          Query the npm registry for the{" "}
          <A href="https://docs.npmjs.com/cli/v6/configuring-npm/package-json">
            manifest
          </A>{" "}
          describing package <InlineCode code="foo" /> at its latest version
          (for example, <InlineCode code="1.0.0" />)
        </li>

        <li>
          Download the tarball containing package{" "}
          <InlineCode code="foo@1.0.0" /> from the npm registry
        </li>

        <li className="space-y-1">
          Extract the {"package's"} public API from the{" "}
          <A href="#including-type-definition-files">downloaded files</A>:
          <ol className="pl-8 space-y-1 list-decimal">
            <li>
              Find the {"package's"} <A href="#index-file">index file</A> (for
              example, <InlineCode code="index.ts" /> or{" "}
              <InlineCode code="index.d.ts" />)
            </li>

            <li>
              Extract the <A href="#package-overview">{"package's"} overview</A>{" "}
              from the index file
            </li>

            <li>
              Find all the <A href="#package-declarations">declarations</A>{" "}
              exported from the index file
            </li>
          </ol>
        </li>

        <li>Render the documentation page</li>
      </ol>

      <p>
        In the following sections, you will learn how to optimize the metadata
        extracted from your package through this process.
      </p>
    </section>
  );
};

const SupportedPackagesSection = () => {
  return (
    <section className="space-y-2">
      <h2>Supported Packages</h2>

      <p>
        Due to the diversity of the Javascript ecosystem and current technical
        limitations, the public API can only be extracted from packages that:
      </p>

      <ul className="pl-8 space-y-1 list-disc">
        <li>
          Provide exports through a single entry point file (for example,{" "}
          <InlineCode code="index.ts" />) using{" "}
          <A href="https://www.typescriptlang.org/docs/handbook/modules.html#export">
            module export forms
          </A>
          ;
          <br />
          in other words, a user would import functionalities from the package
          as <InlineCode code="import ... from 'foo'" />
        </li>

        <li>
          Include{" "}
          <A href="#including-type-definition-files">
            Typescript definition files
          </A>{" "}
          (
          <InlineCode code=".d.ts" />) and/or Typescript source files (
          <InlineCode code=".ts" />
          );
          <br />
          untyped (Javascript-only) packages are not currently supported
        </li>

        <li className="space-y-1">
          Specify a{" "}
          <A href="https://docs.npmjs.com/cli/v6/configuring-npm/package-json#license">
            license property
          </A>{" "}
          inside <InlineCode code="package.json" /> that:
          <ul className="pl-8 space-y-1 list-disc">
            <li>Is not empty</li>

            <li>
              Is not <InlineCode code="UNLICENSED" />
            </li>

            <li>
              Does not start with <InlineCode code="SEE" /> (for example,{" "}
              <InlineCode code="SEE LICENSE IN ..." />)
            </li>
          </ul>
        </li>
      </ul>

      <p>
        In practice, most open source Typescript and Javascript packages that
        provide their own type definitions should be well supported.
      </p>

      <p>
        If a package does not include type definitions (for example, a
        Javascript-only package) but some are available thanks to the{" "}
        <A href="https://github.com/DefinitelyTyped/DefinitelyTyped">
          Definitely Typed project
        </A>
        , that {"package's"} documentation page will contain a link to the
        corresponding <InlineCode code="@types" /> package.
      </p>
    </section>
  );
};

const IncludingTypeDefinitionFilesSection = () => {
  return (
    <section>
      <h2>Including Type Definition Files</h2>

      <p>
        To include Typescript definition files (
        <InlineCode code=".d.ts" />) and, optionally, Typescript source files (
        <InlineCode code=".ts" />) when publishing your package to npm, you need
        to set the{" "}
        <A href="https://docs.npmjs.com/cli/v6/configuring-npm/package-json#files">
          files property
        </A>{" "}
        inside <InlineCode code="package.json" /> with the desired file
        patterns.
      </p>

      <p>
        You also need to set the <InlineCode code="types" /> property and,
        optionally, the <InlineCode code="source" /> property inside{" "}
        <InlineCode code="package.json" /> to point to the main type definition
        file and source file respectively.
      </p>

      <p>
        For example, consider the following project structure where{" "}
        <InlineCode code="src" /> contains the source file named{" "}
        <InlineCode code="index.ts" /> and <InlineCode code="dist" /> contains
        the type definition file named <InlineCode code="index.d.ts" />:
      </p>

      <CodeBlock code={exampleProjectStructure} language="bash" />

      <p>
        To include both the <InlineCode code="src" /> and{" "}
        <InlineCode code="dist" /> directories in your published npm package and
        to set <InlineCode code="index.d.ts" /> as the main type definition file
        and <InlineCode code="index.ts" /> as the main source file, your{" "}
        {"package's"} <InlineCode code="package.json" /> file should look like
        this:
      </p>

      <CodeBlock code={examplePackageJSONFiles} language="json" />
    </section>
  );
};

const IndexFileSection = () => {
  return (
    <section>
      <h2>Index File</h2>

      <p>
        The index file is the single entry point to your package from which you
        should export all the public declarations using{" "}
        <A href="https://www.typescriptlang.org/docs/handbook/modules.html#export">
          module export forms
        </A>
        .
      </p>

      <p>
        The following example shows a simple index file with one direct export
        and a module re-export:
      </p>

      <CodeBlock code={exampleIndexFile} language="typescript" />

      <p>
        The name of your {"package's"} index file must match one of the
        following filenames, listed in order of preference:
      </p>

      <ol className="pl-8 mt-2 space-y-1 list-decimal">
        <li>
          The name of the Typescript source file (
          <InlineCode code=".ts" />) present in the <InlineCode code="source" />{" "}
          property inside <InlineCode code="package.json" />
        </li>

        <li>
          The name of the Typescript type definition file (
          <InlineCode code=".d.ts" />) present in the{" "}
          <InlineCode code="types" /> (or <InlineCode code="typings" />)
          property inside <InlineCode code="package.json" />
        </li>

        <li>
          The fixed name <InlineCode code="public-package-api.ts" />
        </li>

        <li>
          The name of your package followed by the <InlineCode code=".ts" />{" "}
          extension (for example, <InlineCode code="foo.ts" /> if your package
          is named <InlineCode code="foo" />)
        </li>

        <li>
          The fixed name <InlineCode code="index.ts" />
        </li>

        <li>
          The fixed name <InlineCode code="main.ts" />
        </li>

        <li>
          The fixed name <InlineCode code="public-package-api.d.ts" />
        </li>

        <li>
          The name of your package followed by the <InlineCode code=".d.ts" />{" "}
          extension (for example, <InlineCode code="foo.d.ts" /> if your package
          is named <InlineCode code="foo" />)
        </li>

        <li>
          The fixed name <InlineCode code="index.d.ts" />
        </li>

        <li>
          The fixed name <InlineCode code="main.d.ts" />
        </li>
      </ol>

      <p>
        In case of conflicts (for example, two or more files named{" "}
        <InlineCode code="index.ts" />
        ), the file with the shortest path and that comes first in alphabetical
        order is selected.
      </p>
    </section>
  );
};

const PackageOverviewSection = () => {
  return (
    <section>
      <h2>Package Overview</h2>

      <p>
        The overview is the first documentation section displayed in your{" "}
        {"package's"} documentation page. You can use it to introduce your
        package, describe its functionalities, show examples and provide any
        other relevant information.
      </p>

      <p>
        To write your {"package's"} overview, add a documentation comment
        containing the <InlineCode code="@packageDocumentation" /> tag to your{" "}
        {"package's"} index file like in the following example:
      </p>

      <CodeBlock code={exampleOverviewFile} language="typescript" />

      <p>
        The documentation comment above is rendered according to the{" "}
        <A href="https://github.com/microsoft/tsdoc">TSDoc standard</A> as
        follows:
      </p>

      <div className="p-4 my-4 border border-stone-300 rounded dark:border-stone-700">
        <DocComment doc={exampleOverview} />
      </div>

      <p>
        For more information and examples about TSDoc, see the{" "}
        <A href="https://github.com/microsoft/tsdoc">TSDoc repository</A> and
        the <A href="https://microsoft.github.io/tsdoc">TSDoc playground</A>.
      </p>
    </section>
  );
};

const PackageDeclarationsSection = () => {
  return (
    <section>
      <h2>Package Declarations</h2>

      <p>
        Your package can export, using{" "}
        <A href="https://www.typescriptlang.org/docs/handbook/modules.html#export">
          module export forms
        </A>
        , any of the following kinds of declarations:
      </p>

      <ul className="pl-8 mt-2 space-y-1 list-disc">
        <li>Variables</li>
        <li>Functions</li>
        <li>Classes</li>
        <li>Interfaces</li>
        <li>Enums</li>
        <li>Type aliases</li>
        <li>Namespaces</li>
      </ul>

      <p>
        Exported declarations should be documented using{" "}
        <A href="https://github.com/microsoft/tsdoc">TSDoc</A> documentation
        comments like in the following example:
      </p>

      <CodeBlock code={exampleDeclarationFile} language="typescript" />

      <p>
        The documentation for the <InlineCode code="sum" /> function defined
        above is rendered as follows:
      </p>

      <div className="p-4 my-4 border border-stone-300 rounded dark:border-stone-700">
        <h3>function sum</h3>

        <CodeBlock code={exampleDeclarationSignature} language="typescript" />

        <DocComment doc={exampleDeclarationDoc} />
      </div>

      <p>
        To prevent an exported declaration from being documented, use the{" "}
        <InlineCode code="@internal" /> tag in its documentation comment. Note
        that private declarations (for example, the private fields or methods of
        a class) and declarations with names starting with an underscore (for
        example, <InlineCode code="_foo" />) are never documented.
      </p>

      <p>
        For more information about tags, see{" "}
        <A href="https://github.com/microsoft/tsdoc/blob/master/tsdoc/src/details/StandardTags.ts">
          TsDoc standard tags
        </A>
        .
      </p>
    </section>
  );
};

const ExamplePackagesSection = () => {
  return (
    <section>
      <h2>Example Packages</h2>

      <p>
        You can use the following packages as a reference when documenting your
        package:
      </p>

      <ul className="pl-8 mt-2 space-y-1 list-disc">
        <li>
          <InlineCode code="short-time-ago" /> (
          <PackageLink name="short-time-ago">docs</PackageLink>,{" "}
          <A href="https://github.com/velut/node-short-time-ago">source</A>
          )
          <br />A simple package consisting of one source file exporting a
          single function
        </li>

        <li>
          <InlineCode code="query-registry" /> (
          <PackageLink name="query-registry">docs</PackageLink>,{" "}
          <A href="https://github.com/velut/node-query-registry">source</A>
          )
          <br />A more complex package with multiple exported declarations of
          different kinds
        </li>

        <li>
          <InlineCode code="faastjs" /> (
          <PackageLink name="faastjs">docs</PackageLink>,{" "}
          <A href="https://github.com/faastjs/faast.js">source</A>
          )
          <br />A third-party package that shows what is possible to achieve
          with a rich documentation
        </li>
      </ul>
    </section>
  );
};

export default GuidePage;
