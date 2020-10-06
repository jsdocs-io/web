import React from 'react';
import { DocComment } from '../common/DocComment';

export function PackageOverviewSection({
    overview,
    description,
}: {
    overview?: string;
    description?: string;
}) {
    if (overview) {
        return (
            <section>
                <h2 id="package-overview">Overview</h2>

                <DocComment doc={overview} />
            </section>
        );
    }

    if (description) {
        return (
            <section>
                <h2 id="package-overview">Overview</h2>

                <p>{description}</p>
            </section>
        );
    }

    return null;
}
