import { PackageFile } from '@jsdocs-io/extractor';
import React from 'react';
import { A } from '../common/A';

export function PackageFilesList({ files }: { files: PackageFile[] }) {
    return (
        <ul className="list-inline">
            {files.map(({ filename, unpkgURL, isIndexFile }) => (
                <li key={filename}>
                    {unpkgURL ? (
                        <A href={unpkgURL} title={`View file ${filename}`}>
                            {isIndexFile ? (
                                <span className="font-bold hover:underline">
                                    {filename}
                                </span>
                            ) : (
                                <>{filename}</>
                            )}
                        </A>
                    ) : (
                        <>{filename}</>
                    )}
                </li>
            ))}
        </ul>
    );
}
