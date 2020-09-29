import { ModuleDeclarations } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageClassesSection } from './PackageClassesSection';
import { PackageEnumsSection } from './PackageEnumsSection';
import { PackageFunctionsSection } from './PackageFunctionsSection';
import { PackageInterfacesSection } from './PackageInterfacesSection';
import { PackageNamespacesSection } from './PackageNamespacesSection';
import { PackageTypeAliasesSection } from './PackageTypeAliasesSection';
import { PackageVariablesSection } from './PackageVariablesSection';

export function PackageDeclarationsSections({
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
        <>
            <PackageVariablesSection variables={variables} />

            <PackageFunctionsSection functions={functions} />

            <PackageClassesSection classes={classes} />

            <PackageInterfacesSection interfaces={interfaces} />

            <PackageEnumsSection enums={enums} />

            <PackageTypeAliasesSection typeAliases={typeAliases} />

            <PackageNamespacesSection namespaces={namespaces} />
        </>
    );
}
