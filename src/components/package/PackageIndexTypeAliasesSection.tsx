import { TypeAliasDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section3 } from '../common/Section3';
import { PackageIndexTypeAliasesList } from './PackageIndexTypeAliasesList';

export function PackageIndexTypeAliasesSection({
    typeAliases,
}: {
    typeAliases: TypeAliasDeclaration[];
}) {
    if (!typeAliases.length) {
        return null;
    }

    return (
        <Section3>
            <h3 id="package-index-type-aliases">Type aliases</h3>

            <PackageIndexTypeAliasesList typeAliases={typeAliases} />
        </Section3>
    );
}
