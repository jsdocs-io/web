import { DistTags } from 'query-registry';
import React from 'react';
import { PackageTitleVersionsInfoList } from './PackageTitleVersionsInfoList';

export function PackageTitleVersionsSection({
    name,
    distTags,
    versionsToTimestamps,
    license,
}: {
    name: string;
    distTags: DistTags;
    versionsToTimestamps: Record<string, string>;
    license?: string;
}) {
    return (
        <section>
            <h1 className="break-words">{name}</h1>

            <PackageTitleVersionsInfoList
                distTags={distTags}
                versionsToTimestamps={versionsToTimestamps}
                license={license}
            />
        </section>
    );
}
