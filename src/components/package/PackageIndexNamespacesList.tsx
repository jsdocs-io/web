import { NamespaceDeclaration } from '@jsdocs-io/extractor';
import React from 'react';
import { InternalLink } from '../common/InternalLink';
import { PackageIndexNamespaceMembersList } from './PackageIndexNamespaceMembersList';

export function PackageIndexNamespacesList({
    namespaces,
}: {
    namespaces: NamespaceDeclaration[];
}) {
    return (
        <ul className="space-y-1">
            {namespaces.map(({ id, name, declarations }) => (
                <li key={id}>
                    <details>
                        <summary>
                            <InternalLink
                                href={`#${id}`}
                                title={`Namespace ${name}`}
                            >
                                {name}
                            </InternalLink>
                        </summary>

                        <PackageIndexNamespaceMembersList
                            declarations={declarations}
                        />
                    </details>
                </li>
            ))}
        </ul>
    );
}
