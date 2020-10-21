import React from 'react';
import { useAnchorLinks } from '../../hooks/useAnchorLinks';
import { useDarkMode } from '../../hooks/useDarkMode';
import { CustomHead } from './CustomHead';
import { Footer } from './Footer';
import { Main } from './Main';
import { Navbar } from './Navbar';

export function Layout(props: any) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    useAnchorLinks();

    return (
        <>
            <CustomHead />

            <div className="flex flex-col h-screen text-gray-900 dark:text-gray-100">
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
