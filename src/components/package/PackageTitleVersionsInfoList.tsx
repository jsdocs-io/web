import { DistTags } from 'query-registry';
import React from 'react';
import { isValidLicense } from '../../lib/is-valid-license';
import { TimeAgo } from '../common/TimeAgo';

export function PackageTitleVersionsInfoList({
    distTags,
    versionsTimestamps,
    license,
}: {
    distTags: DistTags;
    versionsTimestamps: Record<string, string>;
    license?: string;
}) {
    const numDistTags = Object.keys(distTags).length;
    const numVersions = Object.keys(versionsTimestamps).length;
    const latestVersion = distTags.latest;
    const latestVersionPublishedAt = versionsTimestamps[latestVersion];

    return (
        <ul className="list-inline">
            <li>
                {numDistTags} tag{numDistTags > 1 && 's'}
            </li>

            <li>
                {numVersions} version{numVersions > 1 && 's'}
            </li>

            <li>
                Version <span className="font-bold">{latestVersion}</span>{' '}
                published <TimeAgo date={latestVersionPublishedAt} />
            </li>

            {isValidLicense({ license }) ? (
                <li>{license} license</li>
            ) : (
                <li>Custom license</li>
            )}
        </ul>
    );
}
