import Link from 'next/link';
import React from 'react';

export function InternalLink({
    href,
    title,
    children,
}: {
    href: string;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <Link href={href}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
                className="text-blue-700 dark:text-blue-300 hover:underline"
                title={title}
            >
                {children}
            </a>
        </Link>
    );
}
