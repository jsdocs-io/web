import { PackageFile } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { H2 } from '../common/H2';
import { Section } from '../common/Section';
import { PackageFilesList } from './PackageFilesList';

export function PackageFilesSection({ files }: { files: PackageFile[] }) {
    const numFiles = files.length;

    return (
        <Section>
            <H2 id="package-files">Package files ({numFiles})</H2>

            <PackageFilesList files={files} />
        </Section>
    );
}
