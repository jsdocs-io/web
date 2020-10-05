import React from 'react';
import { InternalLink } from './InternalLink';

export function PackageLink({
    name,
    version,
    title,
    children,
}: {
    name: string;
    version?: string;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <InternalLink
            href="/package/[...slug]"
            as={version ? `/package/${name}/v/${version}` : `/package/${name}`}
            title={title}
        >
            {children}
        </InternalLink>
    );
}
