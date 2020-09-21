import React from 'react';
import { Section } from '../common/Section';
import { PackageTitleInfoList } from './PackageTitleInfoList';

export function PackageTitleSection({
    name,
    version,
    publishedAt,
    license,
    unpackedSize,
    dependencies,
}: {
    name: string;
    version?: string;
    publishedAt?: string;
    license?: string;
    unpackedSize?: number;
    dependencies?: Record<string, string>;
}) {
    return (
        <Section>
            <h1 className="text-3xl font-bold break-words">{name}</h1>

            <PackageTitleInfoList
                version={version}
                publishedAt={publishedAt}
                license={license}
                unpackedSize={unpackedSize}
                dependencies={dependencies}
            />
        </Section>
    );
}
