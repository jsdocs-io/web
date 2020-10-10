import React from 'react';
import { PackageTitleDocsInfoList } from './PackageTitleDocsInfoList';

export function PackageTitleDocsSection({
    name,
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies,
}: {
    name: string;
    version: string;
    publishedAt: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
}) {
    return (
        <section>
            <h1 className="break-words">{name}</h1>

            <PackageTitleDocsInfoList
                version={version}
                publishedAt={publishedAt}
                license={license}
                unpackedSize={unpackedSize}
                dependencies={dependencies}
            />
        </section>
    );
}
