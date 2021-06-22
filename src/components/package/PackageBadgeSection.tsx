import React from 'react';
import { A } from '../common/A';
import { CodeBlock } from '../common/CodeBlock';
import { InlineCode } from '../common/InlineCode';

export function PackageBadgeSection({ name }: { name: string }) {
    const badgeURL = 'https://img.shields.io/badge/jsDocs.io-reference-blue';
    const packageURL = `https://www.jsdocs.io/package/${name}`;
    const altText = 'jsDocs.io';
    const markdownBadge = `[![${altText}](${badgeURL})](${packageURL})`;
    const htmlBadge = `<a href="${packageURL}"><img src="${badgeURL}" alt="${altText}"></a>`;

    return (
        <section>
            <h2 id="package-badge">Badge</h2>

            <p>
                <span className="mr-2">To add a badge like this one</span>
                <img
                    className="inline mr-2"
                    src="/badge.svg"
                    alt="jsDocs.io badge"
                />
                to your {"package's"} README, use the codes available below.
            </p>

            <p>
                You may also use <A href="https://shields.io/">Shields.io</A> to
                create a custom badge linking to{' '}
                <InlineCode code={packageURL} />.
            </p>

            <ul className="mt-4 space-y-6">
                <li>
                    Markdown
                    <CodeBlock code={markdownBadge} language="markdown" />
                </li>

                <li>
                    HTML
                    <CodeBlock code={htmlBadge} language="html" />
                </li>
            </ul>
        </section>
    );
}
