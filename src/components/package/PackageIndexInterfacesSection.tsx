import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageIndexInterfacesList } from './PackageIndexInterfacesList';

export function PackageIndexInterfacesSection({
    interfaces,
}: {
    interfaces: InterfaceDeclaration[];
}) {
    if (!interfaces.length) {
        return null;
    }

    return (
        <section>
            <h3 id="package-index-interfaces">Interfaces</h3>

            <PackageIndexInterfacesList interfaces={interfaces} />
        </section>
    );
}
