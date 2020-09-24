import { FunctionDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { PackageIndexFunctionsList } from './PackageIndexFunctionsList';

export function PackageIndexFunctionsSection({
    functions,
}: {
    functions: FunctionDeclaration[];
}) {
    if (!functions.length) {
        return null;
    }

    return (
        <section>
            <h3 id="package-index-functions">Functions</h3>

            <PackageIndexFunctionsList functions={functions} />
        </section>
    );
}
