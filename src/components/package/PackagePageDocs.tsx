import React from 'react';
import { PackagePagePropsDocs } from '../../lib/package-page-props';
import { Layout } from '../common/Layout';
import { PackageNav } from './PackageNav';
import { PackagePageFooter } from './PackagePageFooter';

export function PackagePageDocs({ info, createdAt }: PackagePagePropsDocs) {
    const { manifest, api, elapsed } = info;
    const { name, definitelyTypedName, untypedName, repository } = manifest;
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

            <PackagePageFooter createdAt={createdAt} analysisTime={elapsed} />
        </Layout>
    );
}
