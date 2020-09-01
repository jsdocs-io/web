import Head from 'next/head';
import React from 'react';
import { A } from '../components/common/A';
import { CodeBlock } from '../components/common/CodeBlock';
import { DocComment } from '../components/common/DocComment';
import { H1 } from '../components/common/H1';
import { H2 } from '../components/common/H2';
import { H3 } from '../components/common/H3';
import { InlineCode } from '../components/common/InlineCode';
import { InternalLink } from '../components/common/InternalLink';
import { Layout } from '../components/common/Layout';
import { P } from '../components/common/P';
import { Section } from '../components/common/Section';
import {
    exampleDeclarationDoc,
    exampleDeclarationFile,
    exampleDeclarationSignature,
    exampleIndexFile,
    exampleOverview,
    exampleOverviewFile,
    examplePackageJSONFiles,
    examplePackageJSONRepository,
} from '../data/examples';

export default function GuidePage() {
    return (
        <>
            <Head>
                <title>Package documentation guide - jsDocs.io</title>
                <meta
                    name="description"
                    content="Documentation guide for packages displayed on jsDocs.io"
                />
            </Head>

            <Layout>
                <article>
                    <IntroSection />
                    <PackageAnalysisProcessSection />
                    <SupportedPackagesSection />
                    <IndexFileSection />
                    <PackageOverviewSection />
                    <PackageDeclarationsSection />
                    <LinkingToSourceSection />
                    <ExternalDocumentationSection />
                    <ExamplePackagesSection />
                </article>
            </Layout>
        </>
    );
}

function IntroSection() {
    return (
        <section>
            <H1>Package documentation guide</H1>

            <P>
                This guide explains how to improve the documentation of your
                packages as displayed on jsDocs.io.
            </P>
        </section>
    );
}

function PackageAnalysisProcessSection() {
    return (
        <Section>
            <H2>Package analysis process</H2>

            <P>
                When a user visits a package documentation page (for example,{' '}
                <InlineCode code="/package/foo" />
                ), the following package analysis process is executed:
            </P>

            <ol className="my-2 ml-8 list-decimal">
                <li>
                    Query the npm registry for the latest version of package{' '}
                    <InlineCode code="foo" /> (for example,{' '}
                    <InlineCode code="1.0.0" />)
                </li>

                <li>
                    Redirect the user to the versioned package documentation
                    page <InlineCode code="/package/foo/v/1.0.0" />
                </li>

                <li>
                    Query the npm registry for the package manifest describing
                    package <InlineCode code="foo" /> at version{' '}
                    <InlineCode code="1.0.0" />
                </li>

                <li>
                    Download the tarball containing package{' '}
                    <InlineCode code="foo@1.0.0" /> from the npm registry
                </li>

                <li>
                    Extract the package's public API from the downloaded files:
                    <ol className="my-2 ml-4 list-decimal">
                        <li>
                            Find the package's index file (for example,{' '}
                            <InlineCode code="index.ts" />)
                        </li>

                        <li>
                            Extract the package's overview from the index file
                        </li>

                        <li>
                            Find all the declarations exported from the index
                            file
                        </li>

                        <li>
                            Extract relevant metadata from the exported
                            declarations
                        </li>
                    </ol>
                </li>

                <li>Render the documentation page</li>
            </ol>

            <P>
                In the following sections, you will learn how to optimize the
                metadata extracted from your package through this process.
            </P>
        </Section>
    );
}

function SupportedPackagesSection() {
    return (
        <Section>
            <H2>Supported packages</H2>

            <P>
                Due to the diversity of the Javascript ecosystem and current
                technical limitations, some packages are not currently well
                supported.
                <br />
                In particular, the public API can only be extracted from
                packages that meet the following conditions:
            </P>

            <ul className="my-2 ml-8 list-disc">
                <li>
                    Provide exports through a single entry point (for example,{' '}
                    <InlineCode code="index.ts" />) using{' '}
                    <A href="https://www.typescriptlang.org/docs/handbook/modules.html#export">
                        module export forms
                    </A>
                    .
                    <br />
                    In other words, a user would import functionalities from the
                    package like this:{' '}
                    <InlineCode code="import ... from 'foo'" />.
                </li>

                <li>
                    Ship Typescript definition files (
                    <InlineCode code=".d.ts" />) and/or Typescript source files
                    (<InlineCode code=".ts" />
                    ).
                    <br />
                    Javascript-only packages are not currently supported.
                </li>

                <li>
                    Specify a{' '}
                    <A href="https://docs.npmjs.com/files/package.json#license">
                        license field
                    </A>{' '}
                    inside <InlineCode code="package.json" /> that:
                    <ul className="my-2 ml-4 list-disc">
                        <li>Is not empty</li>

                        <li>
                            Is not <InlineCode code="UNLICENSED" />
                        </li>

                        <li>
                            Does not start with <InlineCode code="SEE" /> (for
                            example, <InlineCode code="SEE LICENSE IN ..." />)
                        </li>
                    </ul>
                </li>
            </ul>

            <P>
                In practice, most open-source Typescript and Javascript packages
                shipping their own type definitions should be well supported.
            </P>
        </Section>
    );
}

function IndexFileSection() {
    return (
        <Section>
            <H2>Index file</H2>

            <P>
                The index file is the single entry point of your package from
                which all public functionalities should be exported (or
                re-exported) using{' '}
                <A href="https://www.typescriptlang.org/docs/handbook/modules.html#export">
                    module export forms
                </A>
                . The following example shows a simple index file with one
                direct export and a module re-export:
            </P>

            <CodeBlock code={exampleIndexFile} language="typescript" />

            <P>
                Your package's index file must match one of the following
                filenames, listed in order of preference:
            </P>

            <ol className="my-2 ml-8 list-decimal">
                <li>
                    <InlineCode code="public-package-api.ts" />
                </li>

                <li>
                    <InlineCode code="<package name>.ts" /> (for example,{' '}
                    <InlineCode code="foo.ts" /> if your package is named{' '}
                    <InlineCode code="foo" />)
                </li>

                <li>
                    <InlineCode code="index.ts" />
                </li>

                <li>
                    <InlineCode code="main.ts" />
                </li>

                <li>
                    <InlineCode code="public-package-api.d.ts" />
                </li>

                <li>
                    <InlineCode code="<package name>.d.ts" /> (for example,{' '}
                    <InlineCode code="foo.d.ts" /> if your package is named{' '}
                    <InlineCode code="foo" />)
                </li>

                <li>
                    <InlineCode code="index.d.ts" />
                </li>

                <li>
                    <InlineCode code="main.d.ts" />
                </li>
            </ol>

            {/* // TODO: maybe heading or another section  */}
            <a
                id="include-source-files"
                href="#include-source-files"
                className="hidden"
            >
                Include source files anchor
            </a>
            <P>
                To include source files in your package when publishing to npm,
                you need to specify the appropriate file patterns inside{' '}
                <InlineCode code="package.json" /> using the{' '}
                <A href="https://docs.npmjs.com/files/package.json#files">
                    files field
                </A>
                . For example, if your source files reside in the{' '}
                <InlineCode code="src" /> directory and your built files in the{' '}
                <InlineCode code="dist" /> directory, your{' '}
                <InlineCode code="package.json" /> should look like this:
            </P>

            <CodeBlock code={examplePackageJSONFiles} language="json" />
        </Section>
    );
}

function PackageOverviewSection() {
    return (
        <Section>
            <H2>Package overview</H2>

            <P>
                The package overview is the first section displayed in your
                package's documentation page. In the overview, you can introduce
                your package, describe its functionalities, show examples and
                provide any other relevant information. If the overview is not
                found, the package's description from{' '}
                <InlineCode code="package.json" /> is used instead.
            </P>

            <P>
                To write your package's overview, add a documentation comment
                with the <InlineCode code="@packageDocumentation" /> tag to your
                package's index file like in the following example:
            </P>

            <CodeBlock code={exampleOverviewFile} language="typescript" />

            <P>
                The documentation comment above is rendered according to the{' '}
                <A href="https://github.com/microsoft/tsdoc">TSDoc standard</A>{' '}
                as follows:
            </P>

            <div className="p-4 my-4 border border-gray-300 rounded dark:border-gray-700">
                <DocComment doc={exampleOverview} />
            </div>

            <P>
                For more information and examples about TSDoc, see the{' '}
                <A href="https://github.com/microsoft/tsdoc">
                    TSDoc repository
                </A>{' '}
                and the{' '}
                <A href="https://microsoft.github.io/tsdoc">TSDoc playground</A>
                .
            </P>
        </Section>
    );
}

function PackageDeclarationsSection() {
    return (
        <Section>
            <H2>Package declarations</H2>

            <P>
                Your package can export any of the following declaration kinds:
            </P>

            <ul className="my-2 ml-8 list-disc">
                <li>Variables</li>
                <li>Functions</li>
                <li>Classes</li>
                <li>Interfaces</li>
                <li>Enums</li>
                <li>Type aliases</li>
                <li>Namespaces</li>
            </ul>

            <P>
                Exported declarations should be documented using{' '}
                <A href="https://github.com/microsoft/tsdoc">TSDoc</A>{' '}
                documentation comments like in the following example:
            </P>

            <CodeBlock code={exampleDeclarationFile} language="typescript" />

            <P>
                The documentation for the <InlineCode code="sum" /> function
                above is rendered as follows:
            </P>

            <div className="p-4 my-4 border border-gray-300 rounded dark:border-gray-700">
                <H3>function sum</H3>

                <CodeBlock
                    code={exampleDeclarationSignature}
                    language="typescript"
                />

                <DocComment doc={exampleDeclarationDoc} />
            </div>

            <P>
                To prevent an exported declaration from being documented, use
                the <InlineCode code="@internal" /> tag in its documentation
                comment. Note that private declarations (for example, the
                private methods of a class) and declarations with names starting
                with an underscore (for example, <InlineCode code="_foo" />) are
                never documented.
            </P>

            <P>
                For more information about tags, see{' '}
                <A href="https://github.com/microsoft/tsdoc/blob/master/tsdoc/src/details/StandardTags.ts">
                    TsDoc standard tags
                </A>
                .
            </P>
        </Section>
    );
}

function LinkingToSourceSection() {
    return (
        <Section>
            <H2>Linking to source</H2>

            <P>
                If your published package contains{' '}
                <A href="#include-source-files">source files</A>, you can enable
                links to definitions by specifying a GitHub, GitLab or Bitbucket
                repository in the{' '}
                <A href="https://docs.npmjs.com/files/package.json#repository">
                    repository field
                </A>{' '}
                inside <InlineCode code="package.json" /> like in the following
                example:
            </P>

            <CodeBlock code={examplePackageJSONRepository} language="json" />

            <P>
                The commit corresponding to the published version of your
                package is determined in order of preference by:
            </P>

            <ol className="my-2 ml-8 list-decimal">
                <li>
                    The <InlineCode code="gitHead" /> field that npm should
                    automatically create inside your package's manifest when
                    publishing
                </li>

                <li>
                    The package's version prefixed with <InlineCode code="v" />{' '}
                    (for example, <InlineCode code="v1.0.0" /> for{' '}
                    <InlineCode code="foo@1.0.0" />)
                </li>
            </ol>
        </Section>
    );
}

function ExternalDocumentationSection() {
    return (
        <Section>
            <H2>External documentation</H2>

            <P>
                If your package does not include type definitions (for example,
                a Javascript-only package) but some are available thanks to the{' '}
                <A href="https://github.com/DefinitelyTyped/DefinitelyTyped/">
                    Definitely Typed project
                </A>
                , your package's documentation page will contain a link to the
                corresponding <InlineCode code="@types" /> package.
            </P>
        </Section>
    );
}

function ExamplePackagesSection() {
    return (
        <Section>
            <H2>Example packages</H2>

            <P>
                You can use the following packages as a reference when
                documenting your package:
            </P>

            <ul className="my-2 ml-8 list-disc">
                <li>
                    <InlineCode code="short-time-ago" /> (
                    <InternalLink href="/package/short-time-ago">
                        docs
                    </InternalLink>
                    ,{' '}
                    <A href="https://github.com/velut/node-short-time-ago">
                        source
                    </A>
                    )
                    <br />A simple package consisting of one source file
                    exporting a single function
                </li>

                <li>
                    <InlineCode code="query-registry" /> (
                    <InternalLink href="/package/query-registry">
                        docs
                    </InternalLink>
                    ,{' '}
                    <A href="https://github.com/velut/node-query-registry">
                        source
                    </A>
                    )
                    <br />A more complex package with multiple exported
                    declarations of different kinds
                </li>
            </ul>
        </Section>
    );
}
