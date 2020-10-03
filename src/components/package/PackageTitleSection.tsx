import React from 'react';
import { PackageTitleInfoList } from './PackageTitleInfoList';

export function PackageTitleSection({
    name,
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies,
    hideInfoList = false,
}: {
    name: string;
    version?: string;
    publishedAt?: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
    hideInfoList?: boolean;
}) {
    const showInfoList = !hideInfoList;

    return (
        <section>
            <h1 className="break-words">{name}</h1>

            {showInfoList && (
                <PackageTitleInfoList
                    version={version}
                    publishedAt={publishedAt}
                    license={license}
                    unpackedSize={unpackedSize}
                    dependencies={dependencies}
                />
            )}
        </section>
    );
}
