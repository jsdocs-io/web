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
        <div className={className ?? 'my-4'}>
            <CodeBlockContents code={code} language={language} />
        </div>
    );
}
