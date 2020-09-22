import React from 'react';
import { PackagePagePropsAvailableVersions } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageDistTagsSection } from './PackageDistTagsSection';
import { PackageFooter } from './PackageFooter';
import { PackageNav } from './PackageNav';
import { PackageVersionsSection } from './PackageVersionsSection';

export function PackagePageAvailableVersions({
    packument,
    createdAt,
}: PackagePagePropsAvailableVersions) {
    const { name, repository, distTags, versionsTimestamps } = packument;

    return (
        <Layout>
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

            <PackageFooter createdAt={createdAt} />
        </Layout>
    );
}
