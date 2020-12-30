import React from 'react';
import { useAnchorLinks } from '../../hooks/useAnchorLinks';
import { useLocationHashRefresh } from '../../hooks/useLocationHashRefresh';
import { Footer } from './Footer';
import { Head } from './Head';
import { Main } from './Main';
import { Navbar } from './Navbar';

export function Layout(props: any) {
    useAnchorLinks();
    useLocationHashRefresh();

    return (
        <>
            <Head />

            <div className="flex flex-col h-screen text-gray-900 dark:text-gray-100">
                <Navbar />

                <Main {...props} />

                <Footer />
            </div>
        </>
    );
}
