import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageEnumDeclarationSections } from './PackageEnumDeclarationSections';

export function PackageEnumsSection({ enums }: { enums: EnumDeclaration[] }) {
    if (!enums.length) {
        return null;
    }

    return (
        <section>
            <h2 id="package-enums">Enums</h2>

            <div className="mt-4 space-y-8">
                {enums.map((declaration) => (
                    <div key={declaration.id}>
                        <PackageEnumDeclarationSections
                            declaration={declaration}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
