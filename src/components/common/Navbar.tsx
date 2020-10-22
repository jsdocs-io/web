import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { DarkModeHook } from '../../hooks/useDarkMode';
import { NavbarLinks } from './NavbarLinks';
import { NavbarLogo } from './NavbarLogo';
import { SearchBar } from './SearchBar';

// Import as dynamic component, otherwise client props may differ
// from server rendered ones due to the dark mode state.
const ThemeButton = dynamic(
    (() =>
        import('./ThemeButton').then(({ ThemeButton }) => ThemeButton)) as any,
    { ssr: false }
) as any;

export function Navbar({ isDarkMode, toggleDarkMode }: DarkModeHook) {
    const router = useRouter();
    const showSearchBar = !['/', '/search'].includes(router.pathname);

    return (
        <header className="px-4 py-3 bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center flex-shrink-0 space-x-8">
                    <NavbarLogo showLogoText={!showSearchBar} />

                    <div className="hidden lg:block">
                        <NavbarLinks />
                    </div>
                </div>

                <div className="flex items-center flex-grow ml-4 -mr-2 space-x-2 sm:ml-8 md:flex-grow-0 md:w-1/2 xl:w-1/3">
                    {showSearchBar && <SearchBar />}

                    <div className="ml-auto">
                        <ThemeButton
                            isDarkMode={isDarkMode}
                            toggleDarkMode={toggleDarkMode}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-3 -ml-2 lg:hidden lg:m-0">
                <NavbarLinks />
            </div>
        </header>
    );
}
