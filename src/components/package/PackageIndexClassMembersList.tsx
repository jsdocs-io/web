import { ClassMemberDeclarations } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { getDeclarationKindDescription } from '../../lib/get-declaration-kind-description';
import { isCallableDeclarationKind } from '../../lib/is-callable-declaration-kind';
import { sortByID } from '../../lib/sort-by-id';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexClassMembersList({
    members: rawMembers,
}: {
    members: ClassMemberDeclarations;
}) {
    const { properties, methods } = rawMembers;
    const members = sortByID([...properties, ...methods]);
    if (!members.length) {
        return null;
    }

    return (
        <ul className="pl-4 mt-1 ml-5 border-l border-gray-300 dark:border-gray-700">
            {members.map(({ id, name, kind }) => (
                <li key={id}>
                    <InternalLink
                        href={`#${id}`}
                        title={`Class ${getDeclarationKindDescription({
                            kind,
                        }).toLowerCase()} ${name}`}
                    >
                        {name}
                        {isCallableDeclarationKind({ kind }) && '()'}
                    </InternalLink>
                </li>
            ))}
        </ul>
    );
}
