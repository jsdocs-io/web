import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
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
            <h3 id="package-index-interfaces">Interfaces</h3>

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
