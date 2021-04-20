import { DeclarationKinds } from '@jsdocs-io/extractor';
import React from 'react';
import { getDeclarationKindDescription } from '../../lib/get-declaration-kind-description';
import { A } from '../common/A';

export function PackageDeclarationTitle({
    id,
    name,
    kind,
    unpkgURL,
}: {
    id: string;
    name: string;
    kind: DeclarationKinds;
    unpkgURL?: string;
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
            {unpkgURL ? (
                <A href={unpkgURL} title={`View definition for ${name}`}>
                    {name}
                </A>
            ) : (
                <>{name}</>
            )}
        </h3>
    );
}
