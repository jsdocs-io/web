import { FunctionDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { InternalLink } from '../common/InternalLink';

export function PackageIndexFunctionsList({
    functions,
}: {
    functions: FunctionDeclaration[];
}) {
    return (
        <ul className="mt-2 space-y-1">
            {functions.map(({ id, name }) => (
                <li key={id}>
                    <InternalLink href={`#${id}`} title={`Function ${name}`}>
                        {`${name}()`}
                    </InternalLink>
                </li>
            ))}
        </ul>
    );
}
