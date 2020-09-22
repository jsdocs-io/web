import { FunctionDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
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
            <h3 id="package-index-functions">Functions</h3>

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
