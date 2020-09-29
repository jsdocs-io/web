import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section } from '../common/Section';
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
        <Section>
            <h2 id="package-interfaces">Interfaces</h2>

            {interfaces.map((declaration) => (
                <React.Fragment key={declaration.id}>
                    <PackageInterfaceDeclarationSections
                        declaration={declaration}
                    />
                </React.Fragment>
            ))}
        </Section>
    );
}
