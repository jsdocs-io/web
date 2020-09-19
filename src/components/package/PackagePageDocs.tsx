import React from 'react';
import { PackagePagePropsDocs } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageBadgeSection } from './PackageBadgeSection';
import { PackageDependenciesSections } from './PackageDependenciesSections';
import { PackageFooter } from './PackageFooter';
import { PackageInstallSection } from './PackageInstallSection';
import { PackageNav } from './PackageNav';
import { PackageOverviewSection } from './PackageOverviewSection';
import { PackageTitleSection } from './PackageTitleSection';

export function PackagePageDocs({ info, createdAt }: PackagePagePropsDocs) {
    const { manifest, api, elapsed } = info;

    const {
        name,
        version,
        description,
        definitelyTypedName,
        untypedName,
        repository,
        createdAt: publishedAt,
        license,
        dist: { unpackedSize },
        dependencies,
        devDependencies,
        peerDependencies,
    } = manifest;

    const hasDocs = !!api?.files.length;

    return (
        <Layout>
            <PackageNav
                name={name}
                definitelyTypedName={definitelyTypedName}
                untypedName={untypedName}
                repositoryURL={repository?.url}
                hasDocs={hasDocs}
            />

            <PackageTitleSection
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

            <PackageDependenciesSections
                dependencies={dependencies}
                devDependencies={devDependencies}
                peerDependencies={peerDependencies}
            />

            <PackageBadgeSection name={name} />

            <PackageFooter createdAt={createdAt} analysisTime={elapsed} />
        </Layout>
    );
}
