import React from 'react';
import { DocComment } from '../common/DocComment';
import { H2 } from '../common/H2';
import { P } from '../common/P';
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
                <H2 id="package-overview">Overview</H2>

                <DocComment doc={overview} />
            </Section>
        );
    }

    if (description) {
        return (
            <Section>
                <H2 id="package-overview">Overview</H2>

                <P>{description}</P>
            </Section>
        );
    }

    return null;
}
