import React from 'react';
import { InternalLink } from '../common/InternalLink';
import { Section } from '../common/Section';
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
        <Section>
            <h2 id="package-versions">Versions ({numVersions})</h2>

            <ul className="max-w-xl">
                {Object.entries(versionsTimestamps)
                    .reverse()
                    .map(([version, publishedAt]) => (
                        <li
                            key={version}
                            className="flex flex-wrap justify-between pb-1 mt-4 border-b border-gray-300 dark:border-gray-700"
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
        </Section>
    );
}
