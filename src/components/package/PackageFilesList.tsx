import { PackageFile } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { isRepositoryFile } from '../../lib/is-repository-file';
import { A } from '../common/A';

export function PackageFilesList({ files }: { files: PackageFile[] }) {
    return (
        <ul className="mt-2 list-inline">
            {files.map(({ filename, url, isIndexFile }) => (
                <li key={filename}>
                    <Filename
                        filename={filename}
                        url={url}
                        isIndexFile={isIndexFile}
                    />
                </li>
            ))}
        </ul>
    );
}

function Filename({
    filename,
    url,
    isIndexFile,
}: {
    filename: string;
    url?: string;
    isIndexFile?: boolean;
}) {
    // Can link to source
    if (url && isRepositoryFile({ filename })) {
        return (
            <A href={url} title="View source file">
                {isIndexFile ? (
                    <span className="font-bold hover:underline">
                        {filename}
                    </span>
                ) : (
                    <>{filename}</>
                )}
            </A>
        );
    }

    return (
        <>
            {isIndexFile ? (
                <span className="font-bold">{filename}</span>
            ) : (
                <>{filename}</>
            )}
        </>
    );
}
