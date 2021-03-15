import React from 'react';
import { CodeBlock } from '../common/CodeBlock';

export function PackageInstallSection({ name }: { name: string }) {
    const installCommands = [
        `npm i ${name}`,
        `yarn add ${name}`,
        `pnpm add ${name}`,
    ];

    return (
        <section className="space-y-4">
            <h2 id="package-install">Install</h2>

            {installCommands.map((command) => (
                <CodeBlock key={command} code={command} language="bash" />
            ))}
        </section>
    );
}
