import { ClassDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexClassesSection({
    classes,
}: {
    classes: ClassDeclaration[];
}) {
    if (!classes.length) {
        return null;
    }

    return (
        <>
            <h3 id="package-index-classes">Classes</h3>

            <ul>
                {classes.map(({ id, name }) => (
                    <li key={id}>
                        <InternalLink href={`#${id}`} title={`Class ${name}`}>
                            {name}
                        </InternalLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
