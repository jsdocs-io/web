import React from 'react';
import { CodeBlock } from '../common/CodeBlock';

export function PackageInstallSection({ name }: { name: string }) {
    return (
        <section className="space-y-4">
            <h2 id="package-install">Install</h2>

            <CodeBlock code={`npm i ${name}`} language="bash" />
            <CodeBlock code={`yarn add ${name}`} language="bash" />
            <CodeBlock code={`pnpm add ${name}`} language="bash" />
        </section>
    );
}
