import { DistTags } from 'query-registry';
import React from 'react';
import { H2 } from '../common/H2';
import { InternalLink } from '../common/InternalLink';
import { Section } from '../common/Section';

export function PackageDistTags({
    name,
    distTags,
}: {
    name: string;
    distTags: DistTags;
}) {
    const numTags = Object.keys(distTags).length;

    return (
        <Section>
            <H2 id="dist-tags">Tags ({numTags})</H2>

            <ul className="max-w-xl">
                {Object.entries(distTags).map(([tag, version]) => (
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

                        <span>{tag}</span>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
