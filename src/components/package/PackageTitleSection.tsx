import prettyBytes from 'pretty-bytes';
import React from 'react';
import { DotSeparator } from '../common/DotSeparator';
import { Section } from '../common/Section';
import { TimeAgo } from '../common/TimeAgo';

export function PackageTitleSection({
    name,
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies,
}: {
    name: string;
    version?: string;
    publishedAt?: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
}) {
    return (
        <Section>
            <h1 className="text-3xl font-bold break-words">{name}</h1>

            <PackageInfo
                version={version}
                publishedAt={publishedAt}
                license={license}
                unpackedSize={unpackedSize}
                dependencies={dependencies}
            />
        </Section>
    );
}

function PackageInfo({
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies = {},
}: {
    version?: string;
    publishedAt?: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
}) {
    const numDependencies = Object.keys(dependencies).length;

    return (
        <div className="flex flex-wrap -mx-1">
            <div className="px-1">
                Version <span className="font-bold">{version}</span>
            </div>

            {publishedAt && (
                <>
                    <DotSeparator />

                    <div className="px-1">
                        Published <TimeAgo date={publishedAt} />
                    </div>
                </>
            )}

            {license && (
                <>
                    <DotSeparator />

                    <div className="px-1">{license} license</div>
                </>
            )}

            {unpackedSize && (
                <>
                    <DotSeparator />

                    <div className="px-1">{prettyBytes(unpackedSize)}</div>
                </>
            )}

            <DotSeparator />

            <div className="px-1">
                {numDependencies === 0
                    ? 'No dependencies'
                    : `${numDependencies} dependencies`}
            </div>
        </div>
    );
}
