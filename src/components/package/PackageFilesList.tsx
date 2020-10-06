import { PackageFile } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { isRepositoryFile } from '../../lib/is-repository-file';
import { A } from '../common/A';

export function PackageFilesList({ files }: { files: PackageFile[] }) {
    return (
        <ul className="mt-2 list-inline">
            {files.map(({ filename, url }) => (
                <li key={filename}>
                    {url && isRepositoryFile({ filename }) ? (
                        <A href={url} title="View source file">
                            {filename}
                        </A>
                    ) : (
                        <>{filename}</>
                    )}
                </li>
            ))}
        </ul>
    );
}
