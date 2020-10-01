import { ClassDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';
import { PackageIndexClassMembersList } from './PackageIndexClassMembersList';

export function PackageIndexClassesList({
    classes,
}: {
    classes: ClassDeclaration[];
}) {
    return (
        <ul className="my-2">
            {classes.map(({ id, name, members }) => (
                <li key={id}>
                    <details>
                        <summary>
                            <InternalLink
                                href={`#${id}`}
                                title={`Class ${name}`}
                            >
                                {name}
                            </InternalLink>
                        </summary>

                        <PackageIndexClassMembersList members={members} />
                    </details>
                </li>
            ))}
        </ul>
    );
}
