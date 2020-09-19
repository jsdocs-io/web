import { NamespaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { H3 } from '../common/H3';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexNamespacesSection({
    namespaces,
}: {
    namespaces: NamespaceDeclaration[];
}) {
    if (!namespaces.length) {
        return null;
    }

    return (
        <>
            <H3 id="package-index-namespaces">Namespaces</H3>

            <ul>
                {namespaces.map(({ id, name }) => (
                    <li key={id}>
                        <InternalLink
                            href={`#${id}`}
                            title={`Namespace ${name}`}
                        >
                            {name}
                        </InternalLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
