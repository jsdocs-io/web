import React from 'react';
import { DarkModeHook } from '../../hooks/useDarkMode';

export function NavbarLogo({ isDarkMode }: Pick<DarkModeHook, 'isDarkMode'>) {
    return (
        <a className="flex items-center" href="/" title="jsDocs.io">
            <img
                className="h-8"
                src={isDarkMode ? '/logo-32-dark.png' : '/logo-32-light.png'}
                alt="jsDocs.io logo"
            />

            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                jsDocs.io
            </span>
        </a>
    );
}
