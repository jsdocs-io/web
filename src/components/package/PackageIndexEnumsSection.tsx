import { EnumDeclaration } from '@jsdocs-io/extractor';
import React from 'react';
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
        <section className="space-y-2">
            <h3 id="package-index-enums">Enums</h3>

            <PackageIndexEnumsList enums={enums} />
        </section>
    );
}
