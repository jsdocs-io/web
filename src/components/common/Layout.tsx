import React from 'react';
import { useAnchorLinks } from '../../hooks/useAnchorLinks';
import { useLocationHashRefresh } from '../../hooks/useLocationHashRefresh';
import { CustomHead } from './CustomHead';
import { Footer } from './Footer';
import { Main } from './Main';
import { Navbar } from './Navbar';

export function Layout(props: any) {
    useAnchorLinks();
    useLocationHashRefresh();

    return (
        <>
            <CustomHead />

            <div className="flex flex-col h-screen text-gray-900 dark:text-gray-100">
                <Navbar />

                <Main {...props} />

                <Footer />
            </div>
        </>
    );
}
