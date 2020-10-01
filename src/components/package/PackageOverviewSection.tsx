import React from 'react';
import { DocComment } from '../common/DocComment';
import { Section2 } from '../common/Section2';

export function PackageOverviewSection({
    overview,
    description,
}: {
    overview?: string;
    description?: string;
}) {
    if (overview) {
        return (
            <Section2>
                <h2 id="package-overview">Overview</h2>

                <DocComment doc={overview} />
            </Section2>
        );
    }

    if (description) {
        return (
            <Section2>
                <h2 id="package-overview">Overview</h2>

                <p>{description}</p>
            </Section2>
        );
    }

    return null;
}
