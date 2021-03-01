import NextHead from 'next/head';
import React from 'react';
import { A } from '../components/common/A';
import { InlineCode } from '../components/common/InlineCode';
import { InternalLink } from '../components/common/InternalLink';
import { Layout } from '../components/common/Layout';
import { newTabBookmarklet, redirectBookmarklet } from '../data/bookmarklets';

export default function AboutPage() {
    const pageTitle = 'About - jsDocs.io';
    const pageDescription = 'About jsDocs.io';

    return (
        <>
            <NextHead>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://www.jsdocs.io/about" />

                <meta property="twitter:title" content={pageTitle} />
                <meta
                    property="twitter:description"
                    content={pageDescription}
                />
            </NextHead>

            <Layout>
                <article className="space-y-12">
                    <IntroSection />
                    <TechnologySection />
                    <AddingAPackageSection />
                    <DocumentingAPackageSection />
                    <RemovingAPackageSection />
                    <BadgeSection />
                    <BookmarkletsSection />
                    <FeedbackSection />
                    <PrivacyPolicySection />
                </article>
            </Layout>
        </>
    );
}

function IntroSection() {
    return (
        <section>
            <h1>About</h1>

            <p>
                jsDocs.io is a documentation host for Javascript and Typescript
                packages published on <A href="https://www.npmjs.com/">npm</A>.
            </p>

            <p>
                jsDocs.io was created by{' '}
                <A href="https://github.com/velut">Edoardo Scibona</A> and is
                inspired by other documentation hosts such as{' '}
                <A href="https://pkg.go.dev/">GoDoc</A> and{' '}
                <A href="https://docs.rs">Docs.rs</A>.
            </p>
        </section>
    );
}

function TechnologySection() {
    return (
        <section className="space-y-2">
            <h2>Technology</h2>

            <p>
                jsDocs.io is written in{' '}
                <A href="https://www.typescriptlang.org/">Typescript</A> and
                consists of three main parts:
            </p>

            <ul className="pl-8 space-y-1 list-disc">
                <li>
                    An adapter for the npm registry, available as the{' '}
                    <A href="https://www.npmjs.com/package/query-registry">
                        query-registry
                    </A>{' '}
                    package
                </li>

                <li>
                    A custom API extractor, based on the{' '}
                    <A href="https://github.com/dsherret/ts-morph">ts-morph</A>{' '}
                    library by David Sherret
                </li>

                <li>
                    This website, powered by{' '}
                    <A href="https://nextjs.org/">Next.js</A>
                </li>
            </ul>
        </section>
    );
}

function AddingAPackageSection() {
    return (
        <section className="space-y-2">
            <h2>Adding a Package</h2>

            <p>To add a package to jsDocs.io, you can:</p>

            <ul className="pl-8 space-y-1 list-disc">
                <li>
                    <InternalLink href="/">Search</InternalLink> the package by
                    name
                </li>

                <li>
                    Use one of the <A href="#bookmarklets">bookmarklets</A>{' '}
                    below when browsing packages on{' '}
                    <A href="https://www.npmjs.com/">npm</A>
                </li>

                <li>
                    Directly visit the package's documentation page at{' '}
                    <InlineCode code="jsdocs.io/package/<name>" />
                </li>
            </ul>

            <p>
                If the package wasn't already indexed, it will be downloaded
                from npm, analyzed and its documentation will be displayed.
            </p>
        </section>
    );
}

function DocumentingAPackageSection() {
    return (
        <section>
            <h2>Documenting a Package</h2>

            <p>
                If you are a package author and want to improve your package's
                documentation as displayed on jsDocs.io, please follow the{' '}
                <InternalLink href="/guide">
                    package documentation guide
                </InternalLink>
                .
            </p>
        </section>
    );
}

function RemovingAPackageSection() {
    return (
        <section>
            <h2>Removing a Package</h2>

            <p>
                If you do not want your package's documentation to be displayed
                on jsDocs.io, please contact us at{' '}
                <A href="mailto:info@jsdocs.io">info@jsdocs.io</A>.
            </p>
        </section>
    );
}

function BadgeSection() {
    return (
        <section>
            <h2>Badge</h2>

            <p>
                <span className="mr-2">
                    You can find the Markdown code for a badge like this one
                </span>
                <img
                    className="inline mr-2"
                    src="/badge.svg"
                    alt="jsDocs.io badge"
                />
                at the bottom of your package's documentation page.
            </p>
        </section>
    );
}

function BookmarkletsSection() {
    return (
        <section className="space-y-2">
            <h2>Bookmarklets</h2>

            <p>
                The bookmarklets below redirect you from a package's page on npm
                to the corresponding page on jsDocs.io when clicked.
            </p>

            <p>
                To install a bookmarklet, simply drag and drop it to your
                browser's bookmarks bar.
            </p>

            <ul>
                <li
                    dangerouslySetInnerHTML={{
                        __html: `Redirect: <a href="${redirectBookmarklet}" class="text-blue-700 dark:text-blue-300 hover:underline">jsDocs.io</a>`,
                    }}
                ></li>

                <li
                    dangerouslySetInnerHTML={{
                        __html: `New tab: <a href="${newTabBookmarklet}" class="text-blue-700 dark:text-blue-300 hover:underline">jsDocs.io</a>`,
                    }}
                ></li>
            </ul>
        </section>
    );
}

function FeedbackSection() {
    return (
        <section>
            <h2>Feedback</h2>

            <p>
                To report bugs, leave suggestions, or ask questions, please{' '}
                <A href="https://github.com/jsdocs-io/jsdocs-io/issues">
                    open an issue
                </A>
                .
            </p>

            <p>
                You can also reach us on Twitter at{' '}
                <A href="https://twitter.com/jsDocs">@jsDocs</A> or by email at{' '}
                <A href="mailto:info@jsdocs.io">info@jsdocs.io</A>.
            </p>
        </section>
    );
}

function PrivacyPolicySection() {
    return (
        <section>
            <h2>Privacy Policy</h2>

            <p>
                To learn more about the data collected by jsDocs.io, you can
                visit our{' '}
                <InternalLink href="/privacy">privacy policy</InternalLink>{' '}
                page.
            </p>
        </section>
    );
}
