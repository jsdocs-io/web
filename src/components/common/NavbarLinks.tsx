import React from 'react';

export function NavbarLinks() {
    return (
        <nav className="flex items-center ml-6">
            <a
                className="block p-2 text-lg font-bold text-gray-900 rounded hover:bg-gray-200 dark:text-gray-100 dark-hover:bg-gray-800"
                href="/"
            >
                Home
            </a>

            <a
                className="block p-2 ml-2 text-lg font-bold text-gray-900 rounded hover:bg-gray-200 dark:text-gray-100 dark-hover:bg-gray-800"
                href="/guide"
            >
                Guide
            </a>

            <a
                className="block p-2 ml-2 text-lg font-bold text-gray-900 rounded hover:bg-gray-200 dark:text-gray-100 dark-hover:bg-gray-800"
                href="/about"
            >
                About
            </a>
        </nav>
    );
}
