import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/common/Layout';

export default function Page404({
    message = 'Page not found',
}: {
    message?: string;
}) {
    const pageTitle = 'Page not found - jsDocs.io';
    const pageDescription = pageTitle;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://www.jsdocs.io/404" />

                <meta property="twitter:title" content={pageTitle} />
                <meta
                    property="twitter:description"
                    content={pageDescription}
                />
            </Head>

            <Layout>
                <div className="flex flex-col items-center justify-center h-full">
                    <h1>404</h1>
                    <p className="text-2xl">{message}</p>
                </div>
            </Layout>
        </>
    );
}
