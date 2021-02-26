import { VariableDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
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
        <section className="space-y-2">
            <h3 id="package-index-variables">Variables</h3>

            <PackageIndexVariablesList variables={variables} />
        </section>
    );
}
