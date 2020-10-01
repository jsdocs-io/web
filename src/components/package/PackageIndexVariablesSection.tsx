import { VariableDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section3 } from '../common/Section3';
import { PackageIndexVariablesList } from './PackageIndexVariablesList';

export function PackageIndexVariablesSection({
    variables,
}: {
    variables: VariableDeclaration[];
}) {
    if (!variables.length) {
        return null;
    }

    return (
        <Section3>
            <h3 id="package-index-variables">Variables</h3>

            <PackageIndexVariablesList variables={variables} />
        </Section3>
    );
}
