import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SearchResult } from 'query-registry';
import React from 'react';
import { Layout } from '../components/common/Layout';
import { SearchBar } from '../components/common/SearchBar';
import SearchResults from '../components/search/SearchResults';
import { registry } from '../lib/registry';

export interface SearchPageProps {
    readonly query?: string;
    readonly searchResults: SearchResult[];
}

export default function SearchPage({ query, searchResults }: SearchPageProps) {
    if (!query) {
        return null;
    }

    const pageTitle = `${query} - jsDocs.io`;
    const pageDescription = `Search results for '${query}' on jsDocs.io`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta
                    property="og:url"
                    content="https://www.jsdocs.io/search"
                />

                <meta property="twitter:title" content={pageTitle} />
                <meta
                    property="twitter:description"
                    content={pageDescription}
                />
            </Head>

            <Layout>
                <div className="flex justify-center">
                    <div className="w-full lg:w-2/3">
                        <SearchBar initialQuery={query} />

                        <div className="mt-12">
                            <SearchResults searchResults={searchResults} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const rawQuery = context.query.query as string | undefined;
    const query = rawQuery?.trim();

    if (!query) {
        context.res.writeHead(302, { Location: '/' });
        context.res.end();
        return { props: {} };
    }

    const { objects: searchResults } = await registry.searchPackages({
        text: query,
    });

    const props: SearchPageProps = { query, searchResults };
    return { props };
};
