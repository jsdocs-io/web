import NextHead from "next/head";
import React from "react";
import { PackagePagePropsDocs } from "../../lib/get-package-page-docs-props";
import { hasPackageDeclarations } from "../../lib/has-package-declarations";
import { Layout } from "../common/Layout";
import { PackageAlerts } from "../package/PackageAlerts";
import { PackageBadgeSection } from "../package/PackageBadgeSection";
import { PackageClassesSection } from "../package/PackageClassesSection";
import { PackageDependenciesSection } from "../package/PackageDependenciesSection";
import { PackageEnumsSection } from "../package/PackageEnumsSection";
import { PackageFilesSection } from "../package/PackageFilesSection";
import { PackageFooterSection } from "../package/PackageFooterSection";
import { PackageFunctionsSection } from "../package/PackageFunctionsSection";
import { PackageIndexSection } from "../package/PackageIndexSection";
import { PackageInstallSection } from "../package/PackageInstallSection";
import { PackageInterfacesSection } from "../package/PackageInterfacesSection";
import { PackageNamespacesSection } from "../package/PackageNamespacesSection";
import { PackageNav } from "../package/PackageNav";
import { PackageOverviewSection } from "../package/PackageOverviewSection";
import { PackageTitleSection } from "../package/PackageTitleSection";
import { PackageTypeAliasesSection } from "../package/PackageTypeAliasesSection";
import { PackageVariablesSection } from "../package/PackageVariablesSection";

export function PackagePageDocs({ data, createdAt }: PackagePagePropsDocs) {
  const { manifest, api, elapsed } = data;

  const {
    id,
    name,
    version,
    description,
    definitelyTypedName,
    untypedName,
    gitRepository,
    createdAt: publishedAt,
    license,
    dist: { unpackedSize },
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
  } = manifest;

  const hasDocs = hasPackageDeclarations({ api });

  const pageTitle = `${id} - jsDocs.io`;
  const pageDescription = hasDocs
    ? `Documentation for npm package ${id} - jsDocs.io`
    : `Information for npm package ${id} - jsDocs.io`;
  const pageURL = `https://www.jsdocs.io/package/${name}/v/${version}`;

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageURL} />

        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
      </NextHead>

      <Layout>
        <div className="space-y-12">
          <PackageAlerts
            hasDocs={hasDocs}
            definitelyTypedName={definitelyTypedName}
            license={license}
          />

          <PackageNav
            name={name}
            definitelyTypedName={definitelyTypedName}
            untypedName={untypedName}
            repositoryURL={gitRepository?.url}
            hasDocs={hasDocs}
          />

          <PackageTitleSection
            name={name}
            version={version}
            publishedAt={publishedAt}
            unpackedSize={unpackedSize}
            dependencies={dependencies}
            license={license}
          />

          <PackageInstallSection name={name} />

          <PackageOverviewSection
            overview={api?.overview}
            description={description}
          />

          {api && hasDocs && (
            <>
              <PackageIndexSection declarations={api.declarations} />

              <PackageVariablesSection variables={api.declarations.variables} />

              <PackageFunctionsSection functions={api.declarations.functions} />

              <PackageClassesSection classes={api.declarations.classes} />

              <PackageInterfacesSection
                interfaces={api.declarations.interfaces}
              />

              <PackageEnumsSection enums={api.declarations.enums} />

              <PackageTypeAliasesSection
                typeAliases={api.declarations.typeAliases}
              />

              <PackageNamespacesSection
                namespaces={api.declarations.namespaces}
              />

              <PackageFilesSection files={api.files} />
            </>
          )}

          <PackageDependenciesSection
            dependencies={dependencies}
            kind={"dependencies"}
          />

          <PackageDependenciesSection
            dependencies={devDependencies}
            kind={"dev-dependencies"}
          />

          <PackageDependenciesSection
            dependencies={peerDependencies}
            kind={"peer-dependencies"}
          />

          <PackageBadgeSection name={name} />

          <PackageFooterSection
            name={name}
            version={version}
            createdAt={createdAt}
            analysisTime={elapsed}
          />
        </div>
      </Layout>
    </>
  );
}
