import { VariableDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section } from '../common/Section';
import { PackageDeclarationSection } from './PackageDeclarationSection';

export function PackageVariablesSection({
    variables,
}: {
    variables: VariableDeclaration[];
}) {
    if (!variables.length) {
        return null;
    }

    return (
        <Section>
            <h2 id="package-variables">Variables</h2>

            {variables.map((declaration) => (
                <PackageDeclarationSection
                    key={declaration.id}
                    declaration={declaration}
                />
            ))}
        </Section>
    );
}
