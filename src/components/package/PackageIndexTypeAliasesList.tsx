import { TypeAliasDeclaration } from '@jsdocs-io/extractor';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexTypeAliasesList({
    typeAliases,
}: {
    typeAliases: TypeAliasDeclaration[];
}) {
    return (
        <ul className="space-y-1">
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
