import { VariableDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexVariablesSection({
    variables,
}: {
    variables: VariableDeclaration[];
}) {
    if (!variables.length) {
        return null;
    }

    return (
        <>
            <h3 id="package-index-variables">Variables</h3>

            <ul>
                {variables.map(({ id, name }) => (
                    <li key={id}>
                        <InternalLink
                            href={`#${id}`}
                            title={`Variable ${name}`}
                        >
                            {name}
                        </InternalLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
