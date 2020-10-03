import Head from 'next/head';
import React from 'react';
import { PackagePagePropsAvailableVersions } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageDistTagsSection } from './PackageDistTagsSection';
import { PackageFooterSection } from './PackageFooterSection';
import { PackageNav } from './PackageNav';
import { PackageVersionsSection } from './PackageVersionsSection';

export function PackagePageAvailableVersions({
    packument,
    createdAt,
}: PackagePagePropsAvailableVersions) {
    const { name, repository, distTags, versionsTimestamps } = packument;

    return (
        <>
            <Head>
                <title>{name} versions - jsDocs.io</title>
                <meta
                    name="description"
                    content={`Available versions for package ${name} - jsDocs.io`}
                />
            </Head>

            <Layout>
                <div className="space-y-12">
                    <PackageNav
                        name={name}
                        repositoryURL={repository?.url}
                        hideInternalNav={true}
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
