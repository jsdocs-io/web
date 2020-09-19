import { FunctionDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { H3 } from '../common/H3';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexFunctionsSection({
    functions,
}: {
    functions: FunctionDeclaration[];
}) {
    if (!functions.length) {
        return null;
    }

    return (
        <>
            <H3 id="package-index-functions">Functions</H3>

            <ul>
                {functions.map(({ id, name }) => (
                    <li key={id}>
                        <InternalLink
                            href={`#${id}`}
                            title={`Function ${name}`}
                        >{`${name}()`}</InternalLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
