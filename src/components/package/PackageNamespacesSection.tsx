import { NamespaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageNamespaceDeclarationSections } from './PackageNamespaceDeclarationSections';

export function PackageNamespacesSection({
    namespaces,
}: {
    namespaces: NamespaceDeclaration[];
}) {
    if (!namespaces.length) {
        return null;
    }

    return (
        <section className="space-y-4">
            <h2 id="package-namespaces">Namespaces</h2>

            <div className="space-y-8">
                {namespaces.map((declaration) => (
                    <PackageNamespaceDeclarationSections
                        key={declaration.id}
                        declaration={declaration}
                    />
                ))}
            </div>
        </section>
    );
}
