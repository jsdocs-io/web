import { NamespaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section2 } from '../common/Section2';
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
        <Section2>
            <h2 id="package-namespaces">Namespaces</h2>

            {namespaces.map((declaration) => (
                <React.Fragment key={declaration.id}>
                    <PackageNamespaceDeclarationSections
                        declaration={declaration}
                    />
                </React.Fragment>
            ))}
        </Section2>
    );
}
