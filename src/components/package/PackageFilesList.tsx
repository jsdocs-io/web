import { PackageFile } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { isRepositoryFile } from '../../lib/is-repository-file';
import { A } from '../common/A';
import { DotSeparator } from '../common/DotSeparator';

export function PackageFilesList({ files }: { files: PackageFile[] }) {
    return (
        <div className="flex flex-wrap -mx-1">
            {files.sort().map(({ filename, url }, i) => (
                <React.Fragment key={filename}>
                    <div className="px-1">
                        {url && isRepositoryFile({ filename }) ? (
                            <A href={url} title="View source file">
                                {filename}
                            </A>
                        ) : (
                            <>{filename}</>
                        )}
                    </div>

                    {i !== files.length - 1 && <DotSeparator />}
                </React.Fragment>
            ))}
        </div>
    );
}
