import { InterfaceDeclaration } from '@jsdocs-io/extractor';
import React from 'react';
import { PackageDeclarationSection } from './PackageDeclarationSection';

export function PackageInterfaceDeclarationSections({
    declaration,
}: {
    declaration: InterfaceDeclaration;
}) {
    const hasMembers = Object.values(declaration.members).flat().length > 0;

    return (
        <div className="space-y-4">
            <PackageDeclarationSection declaration={declaration} />

            {hasMembers && (
                <div className="py-2 pl-4 space-y-8 border-l-2 border-gray-300 dark:border-gray-700">
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
            )}
        </div>
    );
}
