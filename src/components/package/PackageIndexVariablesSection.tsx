import { VariableDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { H3 } from '../common/H3';
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
            <H3 id="package-index-variables">Variables</H3>

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
