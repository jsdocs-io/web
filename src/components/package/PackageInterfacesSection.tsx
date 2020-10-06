import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageInterfaceDeclarationSections } from './PackageInterfaceDeclarationSections';

export function PackageInterfacesSection({
    interfaces,
}: {
    interfaces: InterfaceDeclaration[];
}) {
    if (!interfaces.length) {
        return null;
    }

    return (
        <section>
            <h2 id="package-interfaces">Interfaces</h2>

            <div className="mt-4 space-y-8">
                {interfaces.map((declaration) => (
                    <div key={declaration.id}>
                        <PackageInterfaceDeclarationSections
                            declaration={declaration}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
