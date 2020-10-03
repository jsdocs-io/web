import prettyBytes from 'pretty-bytes';
import React from 'react';
import { TimeAgo } from '../common/TimeAgo';

export function PackageTitleInfoList({
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
    const numDependenciesDescription = (() => {
        const numDependencies = Object.keys(dependencies).length;
        switch (numDependencies) {
            case 0:
                return 'No dependencies';
            case 1:
                return '1 dependency';
            default:
                return `${numDependencies} dependencies`;
        }
    })();

    return (
        <ul className="list-inline">
            {version && (
                <li>
                    Version <span className="font-bold">{version}</span>
                </li>
            )}

            {publishedAt && (
                <li>
                    Published <TimeAgo date={publishedAt} />
                </li>
            )}

            {license && <li>{license} license</li>}

            {unpackedSize && <li>{prettyBytes(unpackedSize)}</li>}

            <li>{numDependenciesDescription}</li>
        </ul>
    );
}
