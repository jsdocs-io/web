import { PackageFile } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section2 } from '../common/Section2';
import { PackageFilesList } from './PackageFilesList';

export function PackageFilesSection({ files }: { files: PackageFile[] }) {
    const numFiles = files.length;

    return (
        <Section2>
            <h2 id="package-files">Package files ({numFiles})</h2>

            <PackageFilesList files={files} />
        </Section2>
    );
}
