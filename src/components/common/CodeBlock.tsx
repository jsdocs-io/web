import React from 'react';
import { CodeBlockContents } from './CodeBlockContents';

export function CodeBlock({
    code,
    language,
}: {
    code: string;
    language: string;
}) {
    return (
        <div className="my-4">
            <CodeBlockContents code={code} language={language} />
        </div>
    );
}
