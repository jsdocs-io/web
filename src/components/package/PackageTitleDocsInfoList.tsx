import prettyBytes from 'pretty-bytes';
import React from 'react';
import { isValidLicense } from '../../lib/is-valid-license';
import { TimeAgo } from '../common/TimeAgo';

export function PackageTitleDocsInfoList({
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies = {},
}: {
    version: string;
    publishedAt: string;
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
            <li>
                Version <span className="font-bold">{version}</span>
            </li>

            <li>
                Published <TimeAgo date={publishedAt} />
            </li>

            {isValidLicense({ license }) ? (
                <li>{license} license</li>
            ) : (
                <li>Custom license</li>
            )}

            {unpackedSize && <li>{prettyBytes(unpackedSize)}</li>}

            <li>{numDependenciesDescription}</li>
        </ul>
    );
}