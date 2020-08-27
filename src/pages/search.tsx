import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SearchResult } from 'query-registry';
import React from 'react';
import { registry } from '../common/registry';
import { Layout } from '../components/common/Layout';
import { SearchBar } from '../components/common/SearchBar';
import SearchResults from '../components/search/SearchResults';

export interface SearchPageProps {
    readonly query?: string;
    readonly searchResults: SearchResult[];
}

export default function SearchPage({ query, searchResults }: SearchPageProps) {
    if (!query) {
        return null;
    }

    return (
        <Layout>
            <Head>
                <title>{query} - jsDocs.io</title>
                <meta
                    name="description"
                    content={`Search results for ${query} on jsDocs.io`}
                />
            </Head>

            <div className="flex justify-center">
                <div className="w-full lg:w-2/3">
                    <SearchBar initialQuery={query} />

                    <div className="mt-12">
                        <SearchResults searchResults={searchResults} />
                    </div>
                </div>
            </div>
        </Layout>
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
