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
        <section className="space-y-2">
            <h3 id="package-index-namespaces">Namespaces</h3>

            <PackageIndexNamespacesList namespaces={namespaces} />
        </section>
    );
}
