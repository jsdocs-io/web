import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageNavAnchorsList({
    name,
    hasDocs,
}: {
    name: string;
    hasDocs: boolean;
}) {
    return (
        <ul className="mt-2 list-inline">
            {hasDocs && (
                <>
                    <li>
                        <InternalLink href="#package-index" title="View index">
                            Index
                        </InternalLink>
                    </li>

                    <li>
                        <InternalLink
                            href="#package-files"
                            title={`View files for package ${name}`}
                        >
                            Files
                        </InternalLink>
                    </li>
                </>
            )}

            <li>
                <InternalLink
                    href="#package-dependencies"
                    title={`View dependencies of package ${name}`}
                >
                    Dependencies
                </InternalLink>

                <span className="text-gray-600">{' ('}</span>

                <InternalLink
                    href="#package-dev-dependencies"
                    title={`View development dependencies of package ${name}`}
                >
                    Dev
                </InternalLink>

                <span className="text-gray-600">{', '}</span>

                <InternalLink
                    href="#package-peer-dependencies"
                    title={`View peer dependencies of package ${name}`}
                >
                    Peer
                </InternalLink>

                <span className="text-gray-600">{')'}</span>
            </li>

            <li>
                <InternalLink
                    href="#package-badge"
                    title={`View badge for package ${name}`}
                >
                    Badge
                </InternalLink>
            </li>

            <li>
                <InternalLink
                    href="/package/[...slug]"
                    as={`/package/${name}/versions`}
                    title={`View available versions for package ${name}`}
                >
                    Versions
                </InternalLink>
            </li>
        </ul>
    );
}
