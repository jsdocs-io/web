import React from 'react';
import { Section2 } from '../common/Section2';
import { PackageDependenciesList } from './PackageDependenciesList';

export function PackageDependenciesSections({
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
}: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}) {
    const numDependencies = Object.keys(dependencies).length;
    const numDevDependencies = Object.keys(devDependencies).length;
    const numPeerDependencies = Object.keys(peerDependencies).length;

    return (
        <>
            <Section2>
                <h2 id="package-dependencies">
                    Dependencies ({numDependencies})
                </h2>

                {numDependencies > 0 ? (
                    <PackageDependenciesList dependencies={dependencies} />
                ) : (
                    <p>No dependencies.</p>
                )}
            </Section2>

            <Section2>
                <h2 id="package-dev-dependencies">
                    Dev dependencies ({numDevDependencies})
                </h2>

                {numDevDependencies > 0 ? (
                    <PackageDependenciesList dependencies={devDependencies} />
                ) : (
                    <p>No dependencies.</p>
                )}
            </Section2>

            <Section2>
                <h2 id="package-peer-dependencies">
                    Peer dependencies ({numPeerDependencies})
                </h2>

                {numPeerDependencies > 0 ? (
                    <PackageDependenciesList dependencies={peerDependencies} />
                ) : (
                    <p>No dependencies.</p>
                )}
            </Section2>
        </>
    );
}
