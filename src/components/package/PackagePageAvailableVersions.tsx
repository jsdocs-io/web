import React from 'react';
import { PackagePagePropsAvailableVersions } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageDistTags } from './PackageDistTags';
import { PackagePageFooter } from './PackagePageFooter';
import { PackageVersions } from './PackageVersions';

export function PackagePageAvailableVersions({
    packument,
    createdAt,
}: PackagePagePropsAvailableVersions) {
    const { name, distTags, versionsTimestamps } = packument;

    return (
        <Layout>
            <PackageDistTags name={name} distTags={distTags} />

            <PackageVersions
                name={name}
                versionsTimestamps={versionsTimestamps}
            />

            <PackagePageFooter createdAt={createdAt} />
        </Layout>
    );
}
