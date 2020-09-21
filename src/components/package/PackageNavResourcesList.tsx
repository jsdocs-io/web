import React from 'react';
import { A } from '../common/A';

export function PackageNavResourcesList({
    name,
    repositoryURL,
}: {
    name: string;
    repositoryURL?: string;
}) {
    return (
        <ul className="mt-2 list-inline">
            {repositoryURL && (
                <li>
                    <RepositoryLink name={name} repositoryURL={repositoryURL} />
                </li>
            )}

            <li>
                <A
                    href={`https://www.npmjs.com/package/${name}`}
                    title={`View package ${name} on npm`}
                >
                    npm
                </A>
            </li>

            <li>
                <A
                    href={`https://unpkg.com/${name}/`}
                    title={`View package ${name} on unpkg`}
                >
                    unpkg
                </A>
            </li>

            <li>
                <A
                    href={`https://npm.runkit.com/${name}`}
                    title={`Try package ${name} on RunKit`}
                >
                    RunKit
                </A>
            </li>
        </ul>
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
