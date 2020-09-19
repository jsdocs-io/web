import React from 'react';
import { H2 } from '../common/H2';
import { P } from '../common/P';
import { Section } from '../common/Section';
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
            <Section>
                <H2 id="package-dependencies">
                    Dependencies ({numDependencies})
                </H2>

                {numDependencies > 0 ? (
                    <PackageDependenciesList dependencies={dependencies} />
                ) : (
                    <P>No dependencies.</P>
                )}
            </Section>

            <Section>
                <H2 id="package-dev-dependencies">
                    Dev dependencies ({numDevDependencies})
                </H2>

                {numDevDependencies > 0 ? (
                    <PackageDependenciesList dependencies={devDependencies} />
                ) : (
                    <P>No dependencies.</P>
                )}
            </Section>

            <Section>
                <H2 id="package-peer-dependencies">
                    Peer dependencies ({numPeerDependencies})
                </H2>

                {numPeerDependencies > 0 ? (
                    <PackageDependenciesList dependencies={peerDependencies} />
                ) : (
                    <P>No dependencies.</P>
                )}
            </Section>
        </>
    );
}
