import React from 'react';
import { CodeBlockContents } from './CodeBlockContents';

export function DeclarationSignature({ signature }: { signature: string }) {
    return (
        <div className="mt-2 mb-4">
            <CodeBlockContents code={signature} language="typescript" />
        </div>
    );
}
