import { TypeAliasDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexTypeAliasesSection({
    typeAliases,
}: {
    typeAliases: TypeAliasDeclaration[];
}) {
    if (!typeAliases.length) {
        return null;
    }

    return (
        <>
            <h3 id="package-index-type-aliases">Type aliases</h3>

            <ul>
                {typeAliases.map(({ id, name }) => (
                    <li key={id}>
                        <InternalLink
                            href={`#${id}`}
                            title={`Type alias ${name}`}
                        >
                            {name}
                        </InternalLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
