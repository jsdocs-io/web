import { sanitizeUrl } from '@braintree/sanitize-url';
import Link from 'next/link';
import React from 'react';
import { A } from './A';

export function InternalLink({
    href: rawHref,
    as,
    title,
    children,
}: {
    href: string;
    as?: string;
    title?: string;
    children: React.ReactNode;
}) {
    const href = sanitizeUrl(rawHref);
    const samePage = href.startsWith('#');

    if (samePage) {
        // A simple <a> tag prevents re-rendering when jumping to anchors
        return (
            <A href={href} title={title}>
                {children}
            </A>
        );
    }

    return (
        <Link href={href} as={as} prefetch={false}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
                className="text-blue-700 break-all dark:text-blue-300 hover:underline"
                title={title}
            >
                {children}
            </a>
        </Link>
    );
}
