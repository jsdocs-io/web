import { sanitizeUrl } from '@braintree/sanitize-url';
import Link from 'next/link';
import React from 'react';
import { A } from './A';

export function InternalLink({
    href: rawHref,
    title,
    children,
}: {
    href: string;
    title?: string;
    children: React.ReactNode;
}) {
    const href = sanitizeUrl(rawHref);
    const samePage = href.startsWith('#');

    return samePage ? (
        // A simple <a> tag prevents re-render
        <A href={href} title={title}>
            {children}
        </A>
    ) : (
        <Link href={href} prefetch={false}>
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
