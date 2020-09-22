import React from 'react';
import { CodeBlock } from '../common/CodeBlock';
import { Section } from '../common/Section';

export function PackageInstallSection({ name }: { name: string }) {
    return (
        <Section>
            <h2 id="package-install">Install</h2>

            <CodeBlock code={`npm i ${name}`} language="bash" />
            <CodeBlock code={`yarn add ${name}`} language="bash" />
            <CodeBlock code={`pnpm add ${name}`} language="bash" />
        </Section>
    );
}
