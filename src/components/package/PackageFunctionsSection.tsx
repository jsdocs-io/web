import { FunctionDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageDeclarationSection } from './PackageDeclarationSection';

export function PackageFunctionsSection({
    functions,
}: {
    functions: FunctionDeclaration[];
}) {
    if (!functions.length) {
        return null;
    }

    return (
        <section>
            <h2 id="package-functions">Functions</h2>

            <div className="mt-4 space-y-8">
                {functions.map((declaration) => (
                    <PackageDeclarationSection
                        key={declaration.id}
                        declaration={declaration}
                    />
                ))}
            </div>
        </section>
    );
}
