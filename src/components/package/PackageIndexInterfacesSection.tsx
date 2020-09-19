import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { H3 } from '../common/H3';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexInterfacesSection({
    interfaces,
}: {
    interfaces: InterfaceDeclaration[];
}) {
    if (!interfaces.length) {
        return null;
    }

    return (
        <>
            <H3 id="package-index-interfaces">Interfaces</H3>

            <ul>
                {interfaces.map(({ id, name }) => (
                    <li key={id}>
                        <InternalLink
                            href={`#${id}`}
                            title={`Interface ${name}`}
                        >
                            {name}
                        </InternalLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
