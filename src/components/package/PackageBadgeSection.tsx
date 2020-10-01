import React from 'react';
import { CodeBlock } from '../common/CodeBlock';
import { Section2 } from '../common/Section2';

export function PackageBadgeSection({ name }: { name: string }) {
    const badgeURL = 'https://img.shields.io/badge/jsDocs.io-reference-blue';
    const packageURL = `https://www.jsdocs.io/package/${name}`;
    const altText = 'jsDocs.io';
    const markdownBadge = `[![${altText}](${badgeURL})](${packageURL})`;
    const htmlBadge = `<a href="${packageURL}"><img src="${badgeURL}" alt="${altText}"></a>`;

    return (
        <Section2>
            <h2 id="package-badge">Badge</h2>

            <p>
                To link to the latest version of this page from your project,
                you can use the following badge codes.
            </p>

            <ul className="mt-4">
                <li>
                    Markdown
                    <CodeBlock code={markdownBadge} language="markdown" />
                </li>

                <li>
                    HTML
                    <CodeBlock code={htmlBadge} language="html" />
                </li>
            </ul>
        </Section2>
    );
}
