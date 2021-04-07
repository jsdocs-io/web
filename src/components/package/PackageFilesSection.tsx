import { PackageFile } from '@jsdocs-io/extractor';
import React from 'react';
import { PackageFilesList } from './PackageFilesList';

export function PackageFilesSection({
    name,
    version,
    files,
}: {
    name: string;
    version: string;
    files: PackageFile[];
}) {
    return (
        <section className="space-y-2">
            <h2 id="package-files">Package Files ({files.length})</h2>

            <PackageFilesList name={name} version={version} files={files} />
        </section>
    );
}
