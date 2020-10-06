import { NamespaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageIndexNamespacesList } from './PackageIndexNamespacesList';

export function PackageIndexNamespacesSection({
    namespaces,
}: {
    namespaces: NamespaceDeclaration[];
}) {
    if (!namespaces.length) {
        return null;
    }

    return (
        <section>
            <h3 id="package-index-namespaces">Namespaces</h3>

            <PackageIndexNamespacesList namespaces={namespaces} />
        </section>
    );
}
