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

            <div className="pl-6 mt-4 border-l border-gray-300 dark:border-gray-700">
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
                    <React.Fragment key={decl.id}>
                        <PackageClassDeclarationSections declaration={decl} />
                    </React.Fragment>
                ))}

                {declaration.declarations.interfaces.map((decl) => (
                    <React.Fragment key={decl.id}>
                        <PackageInterfaceDeclarationSections
                            declaration={decl}
                        />
                    </React.Fragment>
                ))}

                {declaration.declarations.enums.map((decl) => (
                    <React.Fragment key={decl.id}>
                        <PackageEnumDeclarationSections declaration={decl} />
                    </React.Fragment>
                ))}

                {declaration.declarations.namespaces.map((decl) => (
                    <React.Fragment key={decl.id}>
                        <PackageNamespaceDeclarationSections
                            declaration={decl}
                        />
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
