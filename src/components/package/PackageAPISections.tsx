import { PackageAPI } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageDeclarationsSections } from './PackageDeclarationsSections';
import { PackageFilesSection } from './PackageFilesSection';
import { PackageIndexSection } from './PackageIndexSection';

export function PackageAPISections({
    api,
    hasDocs,
}: {
    api?: PackageAPI;
    hasDocs: boolean;
}) {
    if (!api || !hasDocs) {
        return null;
    }

    const { declarations, files } = api;

    return (
        <>
            <PackageIndexSection declarations={declarations} />

            <PackageDeclarationsSections declarations={declarations} />

            <PackageFilesSection files={files} />
        </>
    );
}
