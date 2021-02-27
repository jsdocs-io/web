import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageEnumDeclarationSections } from './PackageEnumDeclarationSections';

export function PackageEnumsSection({ enums }: { enums: EnumDeclaration[] }) {
    if (!enums.length) {
        return null;
    }

    return (
        <section className="space-y-4">
            <h2 id="package-enums">Enums</h2>

            <div className="space-y-8">
                {enums.map((declaration) => (
                    <PackageEnumDeclarationSections
                        key={declaration.id}
                        declaration={declaration}
                    />
                ))}
            </div>
        </section>
    );
}
