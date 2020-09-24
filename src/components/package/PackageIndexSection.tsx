import { ModuleDeclarations } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section } from '../common/Section';
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
        <Section>
            <h2 id="package-index">Index</h2>

            <div className="space-y-2">
                <PackageIndexVariablesSection variables={variables} />
                <PackageIndexFunctionsSection functions={functions} />
                <PackageIndexClassesSection classes={classes} />
                <PackageIndexInterfacesSection interfaces={interfaces} />
                <PackageIndexEnumsSection enums={enums} />
                <PackageIndexTypeAliasesSection typeAliases={typeAliases} />
                <PackageIndexNamespacesSection namespaces={namespaces} />
            </div>
        </Section>
    );
}
