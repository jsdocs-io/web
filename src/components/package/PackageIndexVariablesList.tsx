import { VariableDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexVariablesList({
    variables,
}: {
    variables: VariableDeclaration[];
}) {
    return (
        <ul className="my-2">
            {variables.map(({ id, name }) => (
                <li key={id}>
                    <InternalLink href={`#${id}`} title={`Variable ${name}`}>
                        {name}
                    </InternalLink>
                </li>
            ))}
        </ul>
    );
}
