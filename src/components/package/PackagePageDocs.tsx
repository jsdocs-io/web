import NextHead from 'next/head';
import React from 'react';
import { PackagePagePropsDocs } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageAPISections } from './PackageAPISections';
import { PackageBadgeSection } from './PackageBadgeSection';
import { PackageDependenciesSections } from './PackageDependenciesSections';
import { PackageExternalTypesAlert } from './PackageExternalTypesAlert';
import { PackageFooterSection } from './PackageFooterSection';
import { PackageInstallSection } from './PackageInstallSection';
import { PackageLicenseAlert } from './PackageLicenseAlert';
import { PackageNav } from './PackageNav';
import { PackageOverviewSection } from './PackageOverviewSection';
import { PackageTitleDocsSection } from './PackageTitleDocsSection';

export function PackagePageDocs({ info, createdAt }: PackagePagePropsDocs) {
    const { manifest, api, elapsed } = info;

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

    const hasDocs = !!api?.files.length;

    const pageTitle = `${id} - jsDocs.io`;
    const pageDescription = `Documentation for npm package ${id} - jsDocs.io`;
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

                    <PackageTitleDocsSection
                        name={name}
                        version={version}
                        publishedAt={publishedAt}
                        license={license}
                        unpackedSize={unpackedSize}
                        dependencies={dependencies}
                    />

                    <PackageInstallSection name={name} />

                    <PackageOverviewSection
                        overview={api?.overview}
                        description={description}
                    />

                    <PackageAPISections api={api} />

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
