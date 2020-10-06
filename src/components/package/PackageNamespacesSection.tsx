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
        <section>
            <h2 id="package-namespaces">Namespaces</h2>

            <div className="mt-4 space-y-8">
                {namespaces.map((declaration) => (
                    <div key={declaration.id}>
                        <PackageNamespaceDeclarationSections
                            declaration={declaration}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
