import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section } from '../common/Section';
import { PackageEnumDeclarationSections } from './PackageEnumDeclarationSections';

export function PackageEnumsSection({ enums }: { enums: EnumDeclaration[] }) {
    if (!enums.length) {
        return null;
    }

    return (
        <Section>
            <h2 id="package-enums">Enums</h2>

            {enums.map((declaration) => (
                <React.Fragment key={declaration.id}>
                    <PackageEnumDeclarationSections declaration={declaration} />
                </React.Fragment>
            ))}
        </Section>
    );
}
