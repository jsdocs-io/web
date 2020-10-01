import { TypeAliasDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section2 } from '../common/Section2';
import { PackageDeclarationSection } from './PackageDeclarationSection';

export function PackageTypeAliasesSection({
    typeAliases,
}: {
    typeAliases: TypeAliasDeclaration[];
}) {
    if (!typeAliases.length) {
        return null;
    }

    return (
        <Section2>
            <h2 id="package-type-aliases">Type aliases</h2>

            {typeAliases.map((declaration) => (
                <PackageDeclarationSection
                    key={declaration.id}
                    declaration={declaration}
                />
            ))}
        </Section2>
    );
}
