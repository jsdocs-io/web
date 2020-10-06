import { PackageFile } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageFilesList } from './PackageFilesList';

export function PackageFilesSection({ files }: { files: PackageFile[] }) {
    const numFiles = files.length;

    return (
        <section>
            <h2 id="package-files">Package files ({numFiles})</h2>

            <PackageFilesList files={files} />
        </section>
    );
}
