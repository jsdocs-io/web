import React from 'react';
import { PackageLink } from '../common/PackageLink';
import { TimeAgo } from '../common/TimeAgo';

export function PackageVersionsSection({
    name,
    versionsToTimestamps,
}: {
    name: string;
    versionsToTimestamps: Record<string, string>;
}) {
    const numVersions = Object.keys(versionsToTimestamps).length;

    return (
        <section>
            <h2 id="package-versions">Versions ({numVersions})</h2>

            <ul className="max-w-3xl mt-6 space-y-6">
                {Object.entries(versionsToTimestamps)
                    .reverse()
                    .map(([version, publishedAt]) => (
                        <li
                            key={version}
                            className="flex flex-wrap justify-between pb-1 border-b border-gray-300 dark:border-gray-700"
                        >
                            <PackageLink
                                name={name}
                                version={version}
                                title={`${name}@${version}`}
                            >
                                {version}
                            </PackageLink>

                            <TimeAgo date={publishedAt} />
                        </li>
                    ))}
            </ul>
        </section>
    );
}
