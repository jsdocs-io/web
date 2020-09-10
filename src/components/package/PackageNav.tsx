import React from 'react';
import { A } from '../common/A';
import { DotSeparator } from '../common/DotSeparator';
import { InternalLink } from '../common/InternalLink';

export function PackageNav({
    name,
    definitelyTypedName,
    untypedName,
    repositoryURL,
    hasDocs = false,
    hideInternalNav = false,
}: {
    name: string;
    definitelyTypedName?: string;
    untypedName?: string;
    repositoryURL?: string;
    hasDocs?: boolean;
    hideInternalNav?: boolean;
}) {
    const showInternalNav = !hideInternalNav;

    return (
        <div className="p-4 border border-gray-300 rounded dark:border-gray-700">
            <PackageNavPackages
                name={name}
                definitelyTypedName={definitelyTypedName}
                untypedName={untypedName}
            />

            <PackageNavResources name={name} repositoryURL={repositoryURL} />

            {showInternalNav && (
                <PackageNavInternal name={name} hasDocs={hasDocs} />
            )}
        </div>
    );
}

function PackageNavPackages({
    name,
    definitelyTypedName,
    untypedName,
}: {
    name: string;
    definitelyTypedName?: string;
    untypedName?: string;
}) {
    return (
        <div className="flex flex-wrap -mx-1">
            <div className="px-1">
                <InternalLink
                    href="/package/[...slug]"
                    as={`/package/${name}`}
                    title={`View the latest version of package ${name}`}
                >
                    <span className="font-bold">{name}</span>
                </InternalLink>
            </div>

            {definitelyTypedName && (
                <>
                    <DotSeparator />

                    <div className="px-1">
                        <InternalLink
                            href="/package/[...slug]"
                            as={`/package/${definitelyTypedName}`}
                            title={`View type definitions for package ${name}`}
                        >
                            <span className="font-bold">
                                {definitelyTypedName}
                            </span>
                        </InternalLink>
                    </div>
                </>
            )}

            {untypedName && (
                <>
                    <DotSeparator />

                    <div className="px-1">
                        <InternalLink
                            href="/package/[...slug]"
                            as={`/package/${untypedName}`}
                            title={`View the latest version of package ${untypedName}`}
                        >
                            <span className="font-bold">{untypedName}</span>
                        </InternalLink>
                    </div>
                </>
            )}
        </div>
    );
}

function PackageNavResources({
    name,
    repositoryURL,
}: {
    name: string;
    repositoryURL?: string;
}) {
    return (
        <div className="flex flex-wrap mt-2 -mx-1">
            {repositoryURL && (
                <>
                    <div className="px-1">
                        <RepositoryLink
                            name={name}
                            repositoryURL={repositoryURL}
                        />
                    </div>

                    <DotSeparator />
                </>
            )}

            <div className="px-1">
                <A
                    href={`https://www.npmjs.com/package/${name}`}
                    title={`View package ${name} on npm`}
                >
                    npm
                </A>
            </div>

            <DotSeparator />

            <div className="px-1">
                <A
                    href={`https://unpkg.com/${name}/`}
                    title={`View package ${name} on unpkg`}
                >
                    unpkg
                </A>
            </div>

            <DotSeparator />

            <div className="px-1">
                <A
                    href={`https://npm.runkit.com/${name}`}
                    title={`Try package ${name} on RunKit`}
                >
                    RunKit
                </A>
            </div>
        </div>
    );
}

function RepositoryLink({
    name,
    repositoryURL,
}: {
    name: string;
    repositoryURL: string;
}) {
    const [host, user, repository] = repositoryURL
        .replace(/^https?:\/\//, '')
        .split('/');

    return (
        <A href={repositoryURL} title={`View repository for package ${name}`}>
            {/* Insert word breaks, otherwise Chrome overflows the text */}
            <span>{host}</span>
            <wbr />

            <span>/</span>
            <span>{user}</span>
            <wbr />

            <span>/</span>
            <span>{repository}</span>
        </A>
    );
}

function PackageNavInternal({
    name,
    hasDocs,
}: {
    name: string;
    hasDocs: boolean;
}) {
    return (
        <div className="flex flex-wrap mt-2 -mx-1">
            {hasDocs && (
                <>
                    <div className="px-1">
                        <InternalLink href="#package-index" title="View index">
                            Index
                        </InternalLink>
                    </div>

                    <DotSeparator />

                    <div className="px-1">
                        <InternalLink
                            href="#package-files"
                            title={`View files for package ${name}`}
                        >
                            Files
                        </InternalLink>
                    </div>

                    <DotSeparator />
                </>
            )}

            <div className="px-1">
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
            </div>

            <DotSeparator />

            <div className="px-1">
                <InternalLink
                    href="#package-badge"
                    title={`View badge for package ${name}`}
                >
                    Badge
                </InternalLink>
            </div>

            <DotSeparator />

            <div className="px-1">
                <InternalLink
                    href="/package/[...slug]"
                    as={`/package/${name}/versions`}
                    title={`View available versions for package ${name}`}
                >
                    Versions
                </InternalLink>
            </div>
        </div>
    );
}
