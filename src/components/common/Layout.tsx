import Head from 'next/head';
import React from 'react';
import { useAnchorLinks } from '../../hooks/useAnchorLinks';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Footer } from './Footer';
import { Main } from './Main';
import { Navbar } from './Navbar';
import { PageTopAnchor } from './PageTopAnchor';

export function Layout(props: any) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    useAnchorLinks();

    return (
        <>
            <Head>
                <meta charSet="utf-8" />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>

            <div className="flex flex-col h-screen text-gray-900 dark:text-gray-100">
                <PageTopAnchor />

                <Navbar
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <Main {...props} />

                <Footer />
            </div>
        </>
    );
}
