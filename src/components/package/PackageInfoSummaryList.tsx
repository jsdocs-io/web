import prettyBytes from 'pretty-bytes';
import { DistTags } from 'query-registry';
import React from 'react';
import { isValidLicense } from '../../lib/is-valid-license';
import { TimeAgo } from '../common/TimeAgo';

export function PackageInfoSummaryList({
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies,
    distTags,
    versionsToTimestamps,
}: {
    version?: string;
    publishedAt?: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
    distTags?: DistTags;
    versionsToTimestamps?: Record<string, string>;
}) {
    const describeDeps = () => {
        const numDeps = Object.keys(dependencies!).length;
        switch (numDeps) {
            case 0:
                return 'No dependencies';
            case 1:
                return '1 dependency';
            default:
                return `${numDeps} dependencies`;
        }
    };

    const describeUnpackedSize = () => {
        return prettyBytes(unpackedSize!);
    };

    const describeDistTags = () => {
        const numDistTags = Object.keys(distTags!).length;
        return `${numDistTags} tag${numDistTags > 1 ? 's' : ''}`;
    };

    const describeVersions = () => {
        const numVersions = Object.keys(versionsToTimestamps!).length;
        return `${numVersions} version${numVersions > 1 ? 's' : ''}`;
    };

    const describeLatestVersion = () => {
        const latestVersion = distTags!.latest;
        const latestVersionPublishedAt = versionsToTimestamps![latestVersion];

        return (
            <>
                Latest version{' '}
                <span className="font-bold">{latestVersion}</span> published{' '}
                <TimeAgo date={latestVersionPublishedAt} />
            </>
        );
    };

    return (
        <ul className="list-inline">
            {/* Docs page info */}
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

            {unpackedSize && <li>{describeUnpackedSize()}</li>}

            {dependencies && <li>{describeDeps()}</li>}

            {/* Available versions page info */}
            {distTags && versionsToTimestamps && (
                <li>{describeLatestVersion()}</li>
            )}

            {distTags && <li>{describeDistTags()}</li>}

            {versionsToTimestamps && <li>{describeVersions()}</li>}

            {/* Common info */}
            {isValidLicense({ license }) ? (
                <li>{license} license</li>
            ) : (
                <li>Custom license</li>
            )}
        </ul>
    );
}
