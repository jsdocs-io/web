import React from 'react';
import { PackagePagePropsAvailableVersions } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageDistTags } from './PackageDistTags';
import { PackageFooter } from './PackageFooter';
import { PackageNav } from './PackageNav';
import { PackageVersions } from './PackageVersions';

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

            <PackageDistTags name={name} distTags={distTags} />

            <PackageVersions
                name={name}
                versionsTimestamps={versionsTimestamps}
            />

            <PackageFooter createdAt={createdAt} />
        </Layout>
    );
}
