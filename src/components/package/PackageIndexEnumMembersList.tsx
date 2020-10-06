import { EnumMemberDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexEnumMembersList({
    members,
}: {
    members: EnumMemberDeclaration[];
}) {
    if (!members.length) {
        return null;
    }

    return (
        <ul className="pl-4 mt-1 ml-5 border-l border-gray-300 dark:border-gray-700">
            {members.map(({ id, name }) => (
                <li key={id}>
                    <InternalLink href={`#${id}`} title={`Enum member ${name}`}>
                        {name}
                    </InternalLink>
                </li>
            ))}
        </ul>
    );
}
