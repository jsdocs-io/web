import { DistTags } from 'query-registry';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageDistTagsSection({
    name,
    distTags,
}: {
    name: string;
    distTags: DistTags;
}) {
    const numTags = Object.keys(distTags).length;

    return (
        <section>
            <h2 id="package-dist-tags">Tags ({numTags})</h2>

            <ul className="max-w-3xl mt-6 space-y-6">
                {Object.entries(distTags).map(([tag, version]) => (
                    <li
                        key={tag}
                        className="flex flex-wrap justify-between pb-1 border-b border-gray-300 dark:border-gray-700"
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
        </section>
    );
}
