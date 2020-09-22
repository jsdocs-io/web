import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
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
            <h3 id="package-index-enums">Enums</h3>

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
