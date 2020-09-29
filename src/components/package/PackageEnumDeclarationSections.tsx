import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageDeclarationSection } from './PackageDeclarationSection';

export function PackageEnumDeclarationSections({
    declaration,
}: {
    declaration: EnumDeclaration;
}) {
    return (
        <>
            <PackageDeclarationSection declaration={declaration} />

            <div className="pl-6 mt-4 border-l border-gray-300 dark:border-gray-700">
                {declaration.members.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}
            </div>
        </>
    );
}
