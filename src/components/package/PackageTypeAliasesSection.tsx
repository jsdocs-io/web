import { TypeAliasDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
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
        <section>
            <h2 id="package-type-aliases">Type Aliases</h2>

            <div className="mt-4 space-y-8">
                {typeAliases.map((declaration) => (
                    <PackageDeclarationSection
                        key={declaration.id}
                        declaration={declaration}
                    />
                ))}
            </div>
        </section>
    );
}
