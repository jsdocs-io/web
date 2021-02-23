import { useRouter } from 'next/router';
import React from 'react';
import { InternalLink } from '../common/InternalLink';
import { PackageVersionsLink } from '../common/PackageVersionsLink';

export function PackageNavDocsResourcesList({
    name,
    hasDocs,
}: {
    name: string;
    hasDocs: boolean;
}) {
    // Do not render this component on the `/package/<name>/versions` route
    const router = useRouter();
    const slug = router.query['slug'] as string[];
    const isPackageAvailableVersionsPage = [...slug].pop() === 'versions';
    if (isPackageAvailableVersionsPage) {
        return null;
    }

    return (
        <ul className="list-inline">
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

                <span className="text-gray-500">{' ('}</span>

                <InternalLink
                    href="#package-dev-dependencies"
                    title={`View development dependencies of package ${name}`}
                >
                    Dev
                </InternalLink>

                <span className="text-gray-500">{', '}</span>

                <InternalLink
                    href="#package-peer-dependencies"
                    title={`View peer dependencies of package ${name}`}
                >
                    Peer
                </InternalLink>

                <span className="text-gray-500">{')'}</span>
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
                <PackageVersionsLink
                    name={name}
                    title={`View available versions for package ${name}`}
                >
                    Versions
                </PackageVersionsLink>
            </li>
        </ul>
    );
}
