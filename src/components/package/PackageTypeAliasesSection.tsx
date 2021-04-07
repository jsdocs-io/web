import { TypeAliasDeclaration } from '@jsdocs-io/extractor';
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
        <section className="space-y-4">
            <h2 id="package-type-aliases">Type Aliases</h2>

            <div className="space-y-8">
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
