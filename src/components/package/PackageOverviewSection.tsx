import React from 'react';
import { DocComment } from '../common/DocComment';

export function PackageOverviewSection({
    overview,
    description,
}: {
    overview?: string;
    description?: string;
}) {
    return (
        <section className="space-y-2">
            <h2 id="package-overview">Overview</h2>

            {overview && <DocComment doc={overview} />}

            {!overview && description && <p>{description}</p>}

            {!overview && !description && <p>Overview not available.</p>}
        </section>
    );
}
