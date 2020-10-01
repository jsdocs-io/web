import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section3 } from '../common/Section3';
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
        <Section3>
            <h3 id="package-index-interfaces">Interfaces</h3>

            <PackageIndexInterfacesList interfaces={interfaces} />
        </Section3>
    );
}
