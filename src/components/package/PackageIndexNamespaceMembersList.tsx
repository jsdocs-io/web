import { Declaration, ModuleDeclarations } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { getDeclarationKindDescription } from '../../lib/get-declaration-kind-description';
import { isCallableDeclarationKind } from '../../lib/is-callable-declaration-kind';
import { sortByID } from '../../lib/sort-by-id';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexNamespaceMembersList({
    declarations,
}: {
    declarations: ModuleDeclarations;
}) {
    const allDeclarations = Object.values(declarations).flat() as Declaration[];
    const members = sortByID(allDeclarations);

    return (
        <ul className="pl-4 mb-1 ml-5 border-l border-gray-300 dark:border-gray-700">
            {members.map(({ id, name, kind }) => (
                <li key={id}>
                    <InternalLink
                        href={`#${id}`}
                        title={`${getDeclarationKindDescription({
                            kind,
                        })} ${name}`}
                    >
                        {name}
                        {isCallableDeclarationKind({ kind }) && '()'}
                    </InternalLink>
                </li>
            ))}
        </ul>
    );
}
