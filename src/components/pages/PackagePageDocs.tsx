import NextHead from 'next/head';
import React from 'react';
import { PackagePagePropsDocs } from '../../lib/get-package-page-docs-props';
import { hasPackageDeclarations } from '../../lib/has-package-declarations';
import { Layout } from '../common/Layout';
import { PackageAPISections } from '../package/PackageAPISections';
import { PackageBadgeSection } from '../package/PackageBadgeSection';
import { PackageDependenciesSections } from '../package/PackageDependenciesSections';
import { PackageExternalTypesAlert } from '../package/PackageExternalTypesAlert';
import { PackageFooterSection } from '../package/PackageFooterSection';
import { PackageInstallSection } from '../package/PackageInstallSection';
import { PackageLicenseAlert } from '../package/PackageLicenseAlert';
import { PackageNav } from '../package/PackageNav';
import { PackageOverviewSection } from '../package/PackageOverviewSection';
import { PackageTitleSection } from '../package/PackageTitleSection';

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
        dependencies,
        devDependencies,
        peerDependencies,
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
                <meta
                    property="twitter:description"
                    content={pageDescription}
                />
            </NextHead>

            <Layout>
                <div className="space-y-12">
                    <PackageLicenseAlert license={license} />

                    <PackageExternalTypesAlert
                        definitelyTypedName={definitelyTypedName}
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
                        dependencies={dependencies ?? {}}
                        license={license}
                    />

                    <PackageInstallSection name={name} />

                    <PackageOverviewSection
                        overview={api?.overview}
                        description={description}
                    />

                    <PackageAPISections api={api} hasDocs={hasDocs} />

                    <PackageDependenciesSections
                        dependencies={dependencies}
                        devDependencies={devDependencies}
                        peerDependencies={peerDependencies}
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
