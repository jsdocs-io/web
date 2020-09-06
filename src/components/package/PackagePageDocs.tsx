import React from 'react';
import { PackagePagePropsDocs } from '../../lib/package-page-props';
import { CodeBlock } from '../common/CodeBlock';
import { H1 } from '../common/H1';
import { Layout } from '../common/Layout';
import { PackagePageFooter } from './PackagePageFooter';

export function PackagePageDocs({ info, createdAt }: PackagePagePropsDocs) {
    return (
        <Layout>
            <H1>{info.id}</H1>

            <CodeBlock
                code={JSON.stringify(info.api, undefined, 2)}
                language="json"
            />

            <PackagePageFooter createdAt={createdAt} />
        </Layout>
    );
}
