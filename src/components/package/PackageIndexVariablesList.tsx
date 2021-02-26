import { VariableDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexVariablesList({
    variables,
}: {
    variables: VariableDeclaration[];
}) {
    return (
        <ul className="space-y-1">
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
