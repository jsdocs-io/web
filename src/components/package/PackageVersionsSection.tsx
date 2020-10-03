import React from 'react';
import { InternalLink } from '../common/InternalLink';
import { TimeAgo } from '../common/TimeAgo';

export function PackageVersionsSection({
    name,
    versionsTimestamps,
}: {
    name: string;
    versionsTimestamps: Record<string, string>;
}) {
    const numVersions = Object.keys(versionsTimestamps).length;

    return (
        <section>
            <h2 id="package-versions">Versions ({numVersions})</h2>

            <ul className="max-w-3xl mt-6 space-y-6">
                {Object.entries(versionsTimestamps)
                    .reverse()
                    .map(([version, publishedAt]) => (
                        <li
                            key={version}
                            className="flex flex-wrap justify-between pb-1 border-b border-gray-300 dark:border-gray-700"
                        >
                            <InternalLink
                                href="/package/[...slug]"
                                as={`/package/${name}/v/${version}`}
                                title={`${name}@${version}`}
                            >
                                {version}
                            </InternalLink>

                            <TimeAgo date={publishedAt} />
                        </li>
                    ))}
            </ul>
        </section>
    );
}
