import React from 'react';
import { PackageDependenciesList } from './PackageDependenciesList';

export function PackageDependenciesSection({
    dependencies,
    kind,
}: {
    dependencies: Record<string, string>;
    kind: 'dependencies' | 'dev-dependencies' | 'peer-dependencies';
}) {
    const numDeps = Object.keys(dependencies).length;
    const [kindTitle, kindDescription] = {
        dependencies: ['Dependencies', ''],
        'dev-dependencies': ['Dev Dependencies', 'dev'],
        'peer-dependencies': ['Peer Dependencies', 'peer'],
    }[kind];

    return (
        <section className="space-y-2">
            <h2 id={`package-${kind}`}>
                {kindTitle} ({numDeps})
            </h2>

            {numDeps > 0 ? (
                <PackageDependenciesList dependencies={dependencies} />
            ) : (
                <p>No {kindDescription} dependencies.</p>
            )}
        </section>
    );
}
