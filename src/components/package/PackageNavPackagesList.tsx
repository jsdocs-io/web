import React from 'react';
import { PackageLink } from '../common/PackageLink';

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
                <PackageLink
                    name={name}
                    title={`View the latest version of package ${name}`}
                >
                    <span className="font-bold">{name}</span>
                </PackageLink>
            </li>

            {definitelyTypedName && (
                <li>
                    <PackageLink
                        name={definitelyTypedName}
                        title={`View type definitions for package ${name}`}
                    >
                        <span className="font-bold">{definitelyTypedName}</span>
                    </PackageLink>
                </li>
            )}

            {untypedName && (
                <li>
                    <PackageLink
                        name={untypedName}
                        title={`View the latest version of package ${untypedName}`}
                    >
                        <span className="font-bold">{untypedName}</span>
                    </PackageLink>
                </li>
            )}
        </ul>
    );
}
