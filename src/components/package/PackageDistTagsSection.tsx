import { DistTags } from 'query-registry';
import React from 'react';
import { PackageLink } from '../common/PackageLink';

export function PackageDistTagsSection({
    name,
    distTags,
}: {
    name: string;
    distTags: DistTags;
}) {
    return (
        <section>
            <h2 id="package-dist-tags">
                Tags ({Object.keys(distTags).length})
            </h2>

            <ul className="max-w-3xl mt-6 space-y-6">
                {Object.entries(distTags).map(([tag, version]) => (
                    <li
                        key={tag}
                        className="flex flex-wrap justify-between pb-1 border-b border-gray-300 dark:border-gray-700"
                    >
                        <PackageLink
                            name={name}
                            version={version}
                            title={`${name}@${version}`}
                        >
                            {version}
                        </PackageLink>

                        <span>{tag}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
