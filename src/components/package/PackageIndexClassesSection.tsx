import { ClassDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section3 } from '../common/Section3';
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
        <Section3>
            <h3 id="package-index-classes">Classes</h3>

            <PackageIndexClassesList classes={classes} />
        </Section3>
    );
}
