import React from 'react';
import { PackagePagePropsDocs } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageFooter } from './PackageFooter';
import { PackageNav } from './PackageNav';
import { PackageTitleSection } from './PackageTitleSection';

export function PackagePageDocs({ info, createdAt }: PackagePagePropsDocs) {
    const { manifest, api, elapsed } = info;

    const {
        name,
        version,
        definitelyTypedName,
        untypedName,
        repository,
        createdAt: publishedAt,
        license,
        dist: { unpackedSize },
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
            />

            <PackageFooter createdAt={createdAt} analysisTime={elapsed} />
        </Layout>
    );
}
