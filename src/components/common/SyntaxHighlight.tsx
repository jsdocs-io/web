import Highlight, { defaultProps } from 'prism-react-renderer';
import React from 'react';

export function SyntaxHighlight({
    code,
    language,
}: {
    code: string;
    language: string;
}) {
    return (
        <Highlight
            {...defaultProps}
            // Use CSS theme for Prism theme imported in `_app.tsx`
            theme={undefined}
            code={code}
            language={language as any}
        >
            {({ className, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} rounded`}>
                    <code>
                        {tokens.map((line, index) => (
                            <div {...getLineProps({ line, key: index })}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </code>
                </pre>
            )}
        </Highlight>
    );
}
