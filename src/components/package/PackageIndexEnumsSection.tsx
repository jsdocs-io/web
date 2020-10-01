import { EnumDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section3 } from '../common/Section3';
import { PackageIndexEnumsList } from './PackageIndexEnumsList';

export function PackageIndexEnumsSection({
    enums,
}: {
    enums: EnumDeclaration[];
}) {
    if (!enums.length) {
        return null;
    }

    return (
        <Section3>
            <h3 id="package-index-enums">Enums</h3>

            <PackageIndexEnumsList enums={enums} />
        </Section3>
    );
}
