import { DistTags } from 'query-registry';
import React from 'react';
import { PackageTitleVersionsInfoList } from './PackageTitleVersionsInfoList';

export function PackageTitleVersionsSection({
    name,
    distTags,
    versionsTimestamps,
    license,
}: {
    name: string;
    distTags: DistTags;
    versionsTimestamps: Record<string, string>;
    license?: string;
}) {
    return (
        <section>
            <h1 className="break-words">{name}</h1>

            <PackageTitleVersionsInfoList
                distTags={distTags}
                versionsTimestamps={versionsTimestamps}
                license={license}
            />
        </section>
    );
}
