import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageDeclarationSection } from './PackageDeclarationSection';

export function PackageInterfaceDeclarationSections({
    declaration,
}: {
    declaration: InterfaceDeclaration;
}) {
    return (
        <>
            <PackageDeclarationSection declaration={declaration} />

            <div className="pl-6 mt-6 space-y-8 border-l border-gray-300 dark:border-gray-700">
                {declaration.members.properties.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}

                {declaration.members.methods.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}

                {declaration.members.constructSignatures.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}

                {declaration.members.callSignatures.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}

                {declaration.members.indexSignatures.map((decl) => (
                    <PackageDeclarationSection
                        key={decl.id}
                        declaration={decl}
                    />
                ))}
            </div>
        </>
    );
}
