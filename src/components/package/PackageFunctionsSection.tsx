import { FunctionDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section } from '../common/Section';
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
        <Section>
            <h2 id="package-functions">Functions</h2>

            {functions.map((declaration) => (
                <PackageDeclarationSection
                    key={declaration.id}
                    declaration={declaration}
                />
            ))}
        </Section>
    );
}
