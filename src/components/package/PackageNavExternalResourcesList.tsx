import React from 'react';
import { A } from '../common/A';

export function PackageNavExternalResourcesList({
    name,
    repositoryURL,
}: {
    name: string;
    repositoryURL?: string;
}) {
    return (
        <ul className="list-inline">
            {repositoryURL && (
                <li>
                    <A
                        href={repositoryURL}
                        title={`View repository for package ${name}`}
                    >
                        {repositoryURL.replace(/^https?:\/\//, '')}
                    </A>
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
