import { ClassDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { H3 } from '../common/H3';
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
            <H3 id="package-index-classes">Classes</H3>

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
