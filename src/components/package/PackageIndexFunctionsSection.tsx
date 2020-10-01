import { FunctionDeclaration } from '@jsdocs-io/package-analyzer';
import React from 'react';
import { Section3 } from '../common/Section3';
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
        <Section3>
            <h3 id="package-index-functions">Functions</h3>

            <PackageIndexFunctionsList functions={functions} />
        </Section3>
    );
}
