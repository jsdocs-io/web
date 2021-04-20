import { Declaration } from '@jsdocs-io/extractor';
import React from 'react';
import { CodeBlock } from '../common/CodeBlock';
import { DocComment } from '../common/DocComment';
import { PackageDeclarationTitle } from './PackageDeclarationTitle';

export function PackageDeclarationSection({
    declaration,
}: {
    declaration: Declaration;
}) {
    const {
        id,
        name,
        kind,
        docs,
        signature,
        source: { unpkgURL },
    } = declaration;

    return (
        <section className="space-y-4">
            <PackageDeclarationTitle
                id={id}
                name={name}
                kind={kind}
                unpkgURL={unpkgURL}
            />

            <CodeBlock code={signature} language="typescript" />

            <ul className="list-declaration-docs">
                {docs.map((doc) => (
                    <li key={doc}>
                        <DocComment doc={doc} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
