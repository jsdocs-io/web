import { ClassDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageIndexClassesList } from './PackageIndexClassesList';

export function PackageIndexClassesSection({
    classes,
}: {
    classes: ClassDeclaration[];
}) {
    if (!classes.length) {
        return null;
    }

    return (
        <section>
            <h3 id="package-index-classes">Classes</h3>

            <PackageIndexClassesList classes={classes} />
        </section>
    );
}
