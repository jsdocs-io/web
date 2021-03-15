import { DeclarationKinds } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { getDeclarationKindDescription } from '../../lib/get-declaration-kind-description';
import { isRepositoryFile } from '../../lib/is-repository-file';
import { A } from '../common/A';

export function PackageDeclarationTitle({
    id,
    name,
    kind,
    url,
    filename,
}: {
    id: string;
    name: string;
    kind: DeclarationKinds;
    url?: string;
    filename: string;
}) {
    const kindDescription = getDeclarationKindDescription({ kind })
        .toLowerCase()
        .replace('constructor', '')
        .replace('construct signature', '')
        .replace('call signature', '')
        .replace('index signature', '')
        .replace('enum member', 'member')
        .replace('type alias', 'type');

    return (
        <h3 className="break-words" id={id}>
            {kindDescription}{' '}
            {url && isRepositoryFile({ filename }) ? (
                <A href={url} title={`View source for ${name}`}>
                    {name}
                </A>
            ) : (
                <>{name}</>
            )}
        </h3>
    );
}
