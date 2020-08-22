import React from 'react';

export function NavbarLogo() {
    return (
        <a
            className="flex items-center pl-2 sm:pl-0"
            href="/"
            title="jsDocs.io"
        >
            <img className="h-12" src="/logo.png" alt="jsDocs.io logo" />

            <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                jsDocs.io
            </span>
        </a>
    );
}
