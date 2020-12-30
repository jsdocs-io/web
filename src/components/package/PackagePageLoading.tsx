import NextHead from 'next/head';
import React from 'react';
import { Layout } from '../common/Layout';

export function PackagePageLoading() {
    const pageTitle = 'Loading... - jsDocs.io';
    const pageDescription = 'Loading page - jsDocs.io';

    return (
        <>
            <NextHead>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
            </NextHead>

            <Layout>
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="animate-pulse">Loading...</h1>
                </div>
            </Layout>
        </>
    );
}
