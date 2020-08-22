import dynamic from 'next/dynamic';
import React from 'react';
import { DarkModeHook } from '../../hooks/useDarkMode';
import { NavbarLinks } from './NavbarLinks';
import { NavbarLogo } from './NavbarLogo';

// Import as dynamic component, otherwise client props may differ
// from server rendered ones due to the dark mode state.
const ThemeButton = dynamic(
    (() =>
        import('./ThemeButton').then(({ ThemeButton }) => ThemeButton)) as any,
    { ssr: false }
) as any;

export function Navbar({ isDarkMode, toggleDarkMode }: DarkModeHook) {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center">
                <NavbarLogo />
                <NavbarLinks />
            </div>

            <div>
                <ThemeButton
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />
            </div>
        </header>
    );
}
