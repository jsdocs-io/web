import { TypeAliasDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexTypeAliasesList({
    typeAliases,
}: {
    typeAliases: TypeAliasDeclaration[];
}) {
    return (
        <ul className="my-2">
            {typeAliases.map(({ id, name }) => (
                <li key={id}>
                    <InternalLink href={`#${id}`} title={`Type alias ${name}`}>
                        {name}
                    </InternalLink>
                </li>
            ))}
        </ul>
    );
}