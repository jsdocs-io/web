import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { TimeAgo } from '../../components/common/TimeAgo';
import {
    PackageRouteKind,
    parsePackageRoute,
} from '../../lib/parse-package-route';

const second = 1;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const hourly = 1 * hour;
const daily = 1 * day;

export default function PackagePage({
    name,
    date,
}: {
    name: string;
    date: string;
}) {
    const router = useRouter();

    if (router.isFallback) {
        return <h1>Loading...</h1>;
    }

    return (
        <h1>
            Package {name} - <TimeAgo date={date} />
        </h1>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params!.slug as string[];
    const slugRoute = slug.slice(0, 4).join('/');
    const route = `/${slugRoute}`;
    const parsedRoute = parsePackageRoute({ route });
    if (!parsedRoute) {
        return { props: {} };
    }

    const date = new Date().toISOString();
    switch (parsedRoute.kind) {
        case PackageRouteKind.LatestDocRoute:
            return {
                props: { name: parsedRoute.name, date },
                revalidate: hourly,
            };
        case PackageRouteKind.VersionDocRoute:
            return {
                props: {
                    name: parsedRoute.name,
                    version: parsedRoute.version as string,
                    date,
                },
                revalidate: daily,
            };
        case PackageRouteKind.VersionsRoute:
            return {
                props: {
                    name: parsedRoute.name,
                    date,
                },
                revalidate: hourly,
            };
    }
};
