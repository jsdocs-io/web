import React from 'react';
import { CodeBlock } from '../common/CodeBlock';

export function PackageDeclarationSignature({
    signature,
}: {
    signature: string;
}) {
    return <CodeBlock code={signature} language="typescript" />;
}
