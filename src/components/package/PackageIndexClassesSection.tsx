import { ClassDeclaration } from '@jsdocs-io/extractor';
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
        <section className="space-y-2">
            <h3 id="package-index-classes">Classes</h3>

            <PackageIndexClassesList classes={classes} />
        </section>
    );
}
