import React from 'react';
import { PackageTitleDocsInfoList } from './PackageTitleDocsInfoList';

export function PackageTitleDocsSection({
    name,
    definitelyTypedName,
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies,
}: {
    name: string;
    definitelyTypedName?: string;
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
                name={name}
                definitelyTypedName={definitelyTypedName}
                version={version}
                publishedAt={publishedAt}
                license={license}
                unpackedSize={unpackedSize}
                dependencies={dependencies}
            />
        </section>
    );
}
