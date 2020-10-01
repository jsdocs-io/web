import { NamespaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section3 } from '../common/Section3';
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
        <Section3>
            <h3 id="package-index-namespaces">Namespaces</h3>

            <PackageIndexNamespacesList namespaces={namespaces} />
        </Section3>
    );
}
