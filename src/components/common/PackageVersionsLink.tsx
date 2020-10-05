import React from 'react';
import { InternalLink } from './InternalLink';

export function PackageVersionsLink({
    name,
    title,
    children,
}: {
    name: string;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <InternalLink
            href="/package/[...slug]"
            as={`/package/${name}/versions`}
            title={title}
        >
            {children}
        </InternalLink>
    );
}
