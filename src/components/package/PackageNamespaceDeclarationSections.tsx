import { NamespaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageClassDeclarationSections } from './PackageClassDeclarationSections';
import { PackageDeclarationSection } from './PackageDeclarationSection';
import { PackageEnumDeclarationSections } from './PackageEnumDeclarationSections';
import { PackageInterfaceDeclarationSections } from './PackageInterfaceDeclarationSections';

export function PackageNamespaceDeclarationSections({
    declaration,
}: {
    declaration: NamespaceDeclaration;
}) {
    return (
        <>
            <PackageDeclarationSection declaration={declaration} />

            <div className="pl-6 mt-6 space-y-8 border-l border-gray-300 dark:border-gray-700">
                {declaration.declarations.variables.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}

                {declaration.declarations.functions.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}

                {declaration.declarations.classes.map((decl) => (
                    <div key={decl.id}>
                        <PackageClassDeclarationSections declaration={decl} />
                    </div>
                ))}

                {declaration.declarations.interfaces.map((decl) => (
                    <div key={decl.id}>
                        <PackageInterfaceDeclarationSections
                            declaration={decl}
                        />
                    </div>
                ))}

                {declaration.declarations.enums.map((decl) => (
                    <div key={decl.id}>
                        <PackageEnumDeclarationSections declaration={decl} />
                    </div>
                ))}

                {declaration.declarations.namespaces.map((decl) => (
                    <div key={decl.id}>
                        <PackageNamespaceDeclarationSections
                            declaration={decl}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
