import { TypeAliasDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section } from '../common/Section';
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
        <Section>
            <h2 id="package-type-aliases">Type aliases</h2>

            {typeAliases.map((declaration) => (
                <PackageDeclarationSection
                    key={declaration.id}
                    declaration={declaration}
                />
            ))}
        </Section>
    );
}
