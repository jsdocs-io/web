import React from 'react';
import { minSemverVersion } from '../../lib/min-semver-version';
import { InternalLink } from '../common/InternalLink';

export function PackageDependenciesList({
    dependencies: rawDependencies,
}: {
    dependencies: Record<string, string>;
}) {
    const dependencies = Object.entries(rawDependencies)
        .sort(([name1], [name2]) => name1.localeCompare(name2))
        .map(([name, semver]) => ({
            name,
            semver,
            version: minSemverVersion({ semver }),
        }));

    return (
        <ul className="list-inline">
            {dependencies.map(({ name, semver, version }) => (
                <li key={name}>
                    <InternalLink
                        href="/package/[...slug]"
                        as={
                            version
                                ? `/package/${name}/v/${version}`
                                : `/package/${name}`
                        }
                        title={`${name}@${semver}`}
                    >
                        {name}
                    </InternalLink>
                </li>
            ))}
        </ul>
    );
}
