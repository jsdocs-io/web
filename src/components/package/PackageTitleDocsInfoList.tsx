import prettyBytes from 'pretty-bytes';
import React from 'react';
import { PackageLink } from '../common/PackageLink';
import { TimeAgo } from '../common/TimeAgo';

export function PackageTitleDocsInfoList({
    name,
    definitelyTypedName,
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies = {},
}: {
    name: string;
    definitelyTypedName?: string;
    version: string;
    publishedAt: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
}) {
    const numDependenciesDescription = (() => {
        const numDependencies = Object.keys(dependencies).length;
        switch (numDependencies) {
            case 0:
                return 'No dependencies';
            case 1:
                return '1 dependency';
            default:
                return `${numDependencies} dependencies`;
        }
    })();

    return (
        <ul className="list-inline">
            {definitelyTypedName && (
                <li>
                    <PackageLink
                        name={definitelyTypedName}
                        title={`View type definitions for package ${name}`}
                    >
                        <span className="font-bold hover:underline">
                            {definitelyTypedName}
                        </span>
                    </PackageLink>
                </li>
            )}

            <li>
                Version <span className="font-bold">{version}</span>
            </li>

            <li>
                Published <TimeAgo date={publishedAt} />
            </li>

            {license && <li>{license} license</li>}

            {unpackedSize && <li>{prettyBytes(unpackedSize)}</li>}

            <li>{numDependenciesDescription}</li>
        </ul>
    );
}
