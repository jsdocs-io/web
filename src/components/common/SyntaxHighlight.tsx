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
            // Use css theme imported in _app
            theme={undefined}
            code={code}
            language={language as any}
        >
            {({ className, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} rounded`}>
                    <code>
                        {tokens.map((line, i) => {
                            const isLineBreak =
                                line.length === 1 &&
                                line[0].content === '' &&
                                i < tokens.length - 1;

                            return (
                                <div {...getLineProps({ line, key: i })}>
                                    {isLineBreak ? (
                                        // See https://github.com/FormidableLabs/prism-react-renderer/issues/36
                                        <span className="inline-block token plain" />
                                    ) : (
                                        line.map((token, key) => (
                                            <span
                                                {...getTokenProps({
                                                    token,
                                                    key,
                                                })}
                                            />
                                        ))
                                    )}
                                </div>
                            );
                        })}
                    </code>
                </pre>
            )}
        </Highlight>
    );
}
