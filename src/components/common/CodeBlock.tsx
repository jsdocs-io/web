import React from 'react';
import { CodeBlockContents } from './CodeBlockContents';

export function CodeBlock({
    code,
    language,
    className,
}: {
    code: string;
    language: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <CodeBlockContents code={code} language={language} />
        </div>
    );
}
