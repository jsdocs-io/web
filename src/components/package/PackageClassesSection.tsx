import { ClassDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section2 } from '../common/Section2';
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
        <Section2>
            <h2 id="package-classes">Classes</h2>

            {classes.map((declaration) => (
                <React.Fragment key={declaration.id}>
                    <PackageClassDeclarationSections
                        declaration={declaration}
                    />
                </React.Fragment>
            ))}
        </Section2>
    );
}
