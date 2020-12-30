import NextHead from 'next/head';
import React from 'react';
import { PackagePagePropsAvailableVersions } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageDistTagsSection } from './PackageDistTagsSection';
import { PackageFooterSection } from './PackageFooterSection';
import { PackageNav } from './PackageNav';
import { PackageTitleVersionsSection } from './PackageTitleVersionsSection';
import { PackageVersionsSection } from './PackageVersionsSection';

export function PackagePageAvailableVersions({
    packument,
    createdAt,
}: PackagePagePropsAvailableVersions) {
    const {
        name,
        repository,
        distTags,
        versionsTimestamps,
        license,
    } = packument;

    const pageTitle = `${name} versions - jsDocs.io`;
    const pageDescription = `Available versions for npm package ${name} - jsDocs.io`;
    const pageURL = `https://www.jsdocs.io/package/${name}/versions`;

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
                    <PackageNav
                        name={name}
                        repositoryURL={repository?.url}
                        hideInternalNav={true}
                    />

                    <PackageTitleVersionsSection
                        name={name}
                        distTags={distTags}
                        versionsTimestamps={versionsTimestamps}
                        license={license}
                    />

                    <PackageDistTagsSection name={name} distTags={distTags} />

                    <PackageVersionsSection
                        name={name}
                        versionsTimestamps={versionsTimestamps}
                    />

                    <PackageFooterSection createdAt={createdAt} />
                </div>
            </Layout>
        </>
    );
}
