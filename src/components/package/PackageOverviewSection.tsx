import React from 'react';
import { DocComment } from '../common/DocComment';
import { Section } from '../common/Section';

export function PackageOverviewSection({
    overview,
    description,
}: {
    overview?: string;
    description?: string;
}) {
    if (overview) {
        return (
            <Section>
                <h2 id="package-overview">Overview</h2>

                <DocComment doc={overview} />
            </Section>
        );
    }

    if (description) {
        return (
            <Section>
                <h2 id="package-overview">Overview</h2>

                <p>{description}</p>
            </Section>
        );
    }

    return null;
}
