import { DistTags } from 'query-registry';
import React from 'react';
import { PackageInfoSummaryList } from './PackageInfoSummaryList';

export function PackageTitleSection({
    name,
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies,
    distTags,
    versionsToTimestamps,
}: {
    name: string;
    version?: string;
    publishedAt?: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
    distTags?: DistTags;
    versionsToTimestamps?: Record<string, string>;
}) {
    return (
        <section className="space-y-2">
            <h1 className="break-all sm:break-words">{name}</h1>

            <PackageInfoSummaryList
                version={version}
                publishedAt={publishedAt}
                license={license}
                unpackedSize={unpackedSize}
                dependencies={dependencies}
                distTags={distTags}
                versionsToTimestamps={versionsToTimestamps}
            />
        </section>
    );
}
