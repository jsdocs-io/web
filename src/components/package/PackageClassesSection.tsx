import { ClassDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageClassDeclarationSections } from './PackageClassDeclarationSections';

export function PackageClassesSection({
    classes,
}: {
    classes: ClassDeclaration[];
}) {
    if (!classes.length) {
        return null;
    }

    return (
        <section>
            <h2 id="package-classes">Classes</h2>

            <div className="mt-4 space-y-8">
                {classes.map((declaration) => (
                    <div key={declaration.id}>
                        <PackageClassDeclarationSections
                            declaration={declaration}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
