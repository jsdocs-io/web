import { PackageFile } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { A } from '../common/A';

export function PackageFilesList({
    name,
    version,
    files: rawFiles,
}: {
    name: string;
    version: string;
    files: PackageFile[];
}) {
    const files = rawFiles.map((file) => {
        const { filename, url: rawURL } = file;
        const unpkgURL = `https://unpkg.com/browse/${name}@${version}/${filename}`;

        // Type definition files are present on GitHub for DefinitelyTyped packages.
        // For other packages try to link to an available source for the file
        // between unpkg and the original repository.
        const url =
            filename.endsWith('.d.ts') && !name.startsWith('@types/')
                ? unpkgURL
                : rawURL ?? unpkgURL;

        return { ...file, url };
    });

    return (
        <ul className="list-inline">
            {files.map(({ filename, url, isIndexFile }) => (
                <li key={filename}>
                    <A href={url} title={`View file ${filename}`}>
                        {isIndexFile ? (
                            <span className="font-bold hover:underline">
                                {filename}
                            </span>
                        ) : (
                            <>{filename}</>
                        )}
                    </A>
                </li>
            ))}
        </ul>
    );
}
