import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageDeclarationSection } from './PackageDeclarationSection';

export function PackageEnumDeclarationSections({
    declaration,
}: {
    declaration: EnumDeclaration;
}) {
    return (
        <div className="space-y-4">
            <PackageDeclarationSection declaration={declaration} />

            <div className="py-2 pl-4 space-y-8 border-l-2 border-gray-300 dark:border-gray-700">
                {declaration.members.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}
            </div>
        </div>
    );
}
