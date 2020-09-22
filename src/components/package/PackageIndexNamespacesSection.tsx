import { NamespaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
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
            <h3 id="package-index-namespaces">Namespaces</h3>

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
