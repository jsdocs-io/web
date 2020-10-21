import Head from 'next/head';
import React from 'react';

export function CustomHead() {
    return (
        <Head>
            <meta charSet="utf-8" />

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />

            {/* Global Open Graph tags */}
            <meta property="og:type" content="website" />
            <meta
                property="og:image"
                content="https://www.jsdocs.io/logo.png"
            />
            <meta property="og:image:alt" content="jsDocs.io logo" />
            <meta property="og:site_name" content="jsDocs.io" />

            {/* Prevent flash of unstyled content */}
            <script src="/no-dark-mode-flash.min.js" />

            {/* Plausible.io analytics */}
            {/* See https://github.com/vercel/next.js/issues/9070#issuecomment-552981178 */}
            {process.env.NODE_ENV === 'production' && process.browser && (
                <script
                    async
                    defer
                    data-domain="jsdocs.io"
                    src="https://plausible.io/js/plausible.js"
                />
            )}
        </Head>
    );
}
