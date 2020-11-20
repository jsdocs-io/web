import Link from 'next/link';
import React from 'react';

export function NavbarLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link href={href}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="block p-2 text-lg font-bold rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                {children}
            </a>
        </Link>
    );
}
