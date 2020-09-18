import React from 'react';
import { CodeBlock } from '../common/CodeBlock';
import { H2 } from '../common/H2';
import { P } from '../common/P';
import { Section } from '../common/Section';

export function PackageBadgeSection({ name }: { name: string }) {
    const badgeURL = 'https://img.shields.io/badge/jsDocs.io-reference-blue';
    const packageURL = `https://www.jsdocs.io/package/${name}`;
    const altText = 'jsDocs.io';
    const markdownBadge = `[![${altText}](${badgeURL})](${packageURL})`;
    const htmlBadge = `<a href="${packageURL}"><img src="${badgeURL}" alt="${altText}"></a>`;

    return (
        <Section>
            <H2 id="package-badge">Badge</H2>

            <P>
                To link to the latest version of this page from your project,
                you can use the following badge codes.
            </P>

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
        </Section>
    );
}
