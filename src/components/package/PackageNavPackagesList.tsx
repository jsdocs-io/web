import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageNavPackagesList({
    name,
    definitelyTypedName,
    untypedName,
}: {
    name: string;
    definitelyTypedName?: string;
    untypedName?: string;
}) {
    return (
        <ul className="list-inline">
            <li>
                <InternalLink
                    href="/package/[...slug]"
                    as={`/package/${name}`}
                    title={`View the latest version of package ${name}`}
                >
                    <span className="font-bold">{name}</span>
                </InternalLink>
            </li>

            {definitelyTypedName && (
                <li>
                    <InternalLink
                        href="/package/[...slug]"
                        as={`/package/${definitelyTypedName}`}
                        title={`View type definitions for package ${name}`}
                    >
                        <span className="font-bold">{definitelyTypedName}</span>
                    </InternalLink>
                </li>
            )}

            {untypedName && (
                <li>
                    <InternalLink
                        href="/package/[...slug]"
                        as={`/package/${untypedName}`}
                        title={`View the latest version of package ${untypedName}`}
                    >
                        <span className="font-bold">{untypedName}</span>
                    </InternalLink>
                </li>
            )}
        </ul>
    );
}
