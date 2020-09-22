import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/common/Layout';

export default function Page404({
    message = 'Page not found',
}: {
    message?: string;
}) {
    return (
        <>
            <Head>
                <title>Page not found - jsDocs.io</title>
                <meta name="description" content="Page not found - jsDocs.io" />
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
