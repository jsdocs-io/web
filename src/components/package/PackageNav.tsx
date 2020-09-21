import React from 'react';
import { PackageNavAnchorsList } from './PackageNavAnchorsList';
import { PackageNavPackagesList } from './PackageNavPackagesList';
import { PackageNavResourcesList } from './PackageNavResourcesList';

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
            <PackageNavPackagesList
                name={name}
                definitelyTypedName={definitelyTypedName}
                untypedName={untypedName}
            />

            <PackageNavResourcesList
                name={name}
                repositoryURL={repositoryURL}
            />

            {showInternalNav && (
                <PackageNavAnchorsList name={name} hasDocs={hasDocs} />
            )}
        </div>
    );
}
