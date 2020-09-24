import { InterfaceDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';
import { PackageIndexInterfaceMembersList } from './PackageIndexInterfaceMembersList';

export function PackageIndexInterfacesList({
    interfaces,
}: {
    interfaces: InterfaceDeclaration[];
}) {
    return (
        <ul>
            {interfaces.map(({ id, name, members }) => (
                <li key={id}>
                    <details>
                        <summary>
                            <InternalLink
                                href={`#${id}`}
                                title={`Interface ${name}`}
                            >
                                {name}
                            </InternalLink>
                        </summary>

                        <PackageIndexInterfaceMembersList members={members} />
                    </details>
                </li>
            ))}
        </ul>
    );
}
