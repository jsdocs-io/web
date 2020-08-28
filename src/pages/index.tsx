import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/common/Layout';
import { SearchBar } from '../components/common/SearchBar';

export default function IndexPage() {
    return (
        <>
            <Head>
                <title>jsDocs.io</title>
                <meta
                    name="description"
                    content="jsDocs.io is a documentation host for Javascript and Typescript packages"
                />
            </Head>

            <Layout>
                <div className="flex flex-col items-center">
                    <img
                        className="h-32"
                        src="/logo.png"
                        alt="jsDocs.io logo"
                    />

                    <div className="w-full mt-4 sm:w-2/3 lg:w-1/2">
                        <SearchBar />
                    </div>
                </div>
            </Layout>
        </>
    );
}
