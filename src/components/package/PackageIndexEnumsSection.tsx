import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { H3 } from '../common/H3';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexEnumsSection({
    enums,
}: {
    enums: EnumDeclaration[];
}) {
    if (!enums.length) {
        return null;
    }

    return (
        <>
            <H3 id="package-index-enums">Enums</H3>

            <ul>
                {enums.map(({ id, name }) => (
                    <li key={id}>
                        <InternalLink href={`#${id}`} title={`Enum ${name}`}>
                            {name}
                        </InternalLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
