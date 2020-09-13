import React from 'react';
import { CodeBlock } from '../common/CodeBlock';
import { H2 } from '../common/H2';
import { Section } from '../common/Section';

export function PackageInstallSection({ name }: { name: string }) {
    return (
        <Section>
            <H2 id="package-install">Install</H2>

            <CodeBlock code={`npm i ${name}`} language="bash" />
            <CodeBlock code={`yarn add ${name}`} language="bash" />
            <CodeBlock code={`pnpm add ${name}`} language="bash" />
        </Section>
    );
}
