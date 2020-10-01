import { ModuleDeclarations } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section2 } from '../common/Section2';
import { PackageIndexClassesSection } from './PackageIndexClassesSection';
import { PackageIndexEnumsSection } from './PackageIndexEnumsSection';
import { PackageIndexFunctionsSection } from './PackageIndexFunctionsSection';
import { PackageIndexInterfacesSection } from './PackageIndexInterfacesSection';
import { PackageIndexNamespacesSection } from './PackageIndexNamespacesSection';
import { PackageIndexTypeAliasesSection } from './PackageIndexTypeAliasesSection';
import { PackageIndexVariablesSection } from './PackageIndexVariablesSection';

export function PackageIndexSection({
    declarations,
}: {
    declarations: ModuleDeclarations;
}) {
    const {
        variables,
        functions,
        classes,
        interfaces,
        enums,
        typeAliases,
        namespaces,
    } = declarations;

    return (
        <Section2>
            <h2 id="package-index">Index</h2>

            <PackageIndexVariablesSection variables={variables} />
            <PackageIndexFunctionsSection functions={functions} />
            <PackageIndexClassesSection classes={classes} />
            <PackageIndexInterfacesSection interfaces={interfaces} />
            <PackageIndexEnumsSection enums={enums} />
            <PackageIndexTypeAliasesSection typeAliases={typeAliases} />
            <PackageIndexNamespacesSection namespaces={namespaces} />
        </Section2>
    );
}
