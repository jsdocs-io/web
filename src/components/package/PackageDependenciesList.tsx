import React from 'react';
import { minSemverVersion } from '../../lib/min-semver-version';
import { DotSeparator } from '../common/DotSeparator';
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
        <div className="flex flex-wrap -mx-1">
            {dependencies.map(({ name, semver, version }, i) => (
                <React.Fragment key={name}>
                    <div className="px-1">
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
                    </div>

                    {i !== dependencies.length - 1 && <DotSeparator />}
                </React.Fragment>
            ))}
        </div>
    );
}
