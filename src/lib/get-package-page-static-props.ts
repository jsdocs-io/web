import { GetStaticPropsResult } from 'next';
import { cleanObject } from './clean-object';
import { packageAnalyzer } from './package-analyzer';
import {
    PackagePageKind,
    PackagePageProps,
    PackagePagePropsAvailableVersions,
    PackagePagePropsDocs,
    PackagePagePropsError,
} from './package-page-props';
import {
    PackageRouteAvailableVersions,
    PackageRouteDocFixedVersion,
    PackageRouteDocLatestVersion,
    PackageRouteKind,
    parsePackageRoute,
} from './parse-package-route';
import { registry } from './registry';
import { hour, minute, week } from './revalidate-times';

export async function getPackagePageStaticProps({
    route,
}: {
    route: string;
}): Promise<GetStaticPropsResult<PackagePageProps>> {
    const parsedRoute = parsePackageRoute({ route });

    switch (parsedRoute.kind) {
        case PackageRouteKind.DocLatestVersion:
            return getDocLatestVersionProps(parsedRoute);
        case PackageRouteKind.DocFixedVersion:
            return getDocFixedVersionProps(parsedRoute);
        case PackageRouteKind.AvailableVersions:
            return getAvailableVersionsProps(parsedRoute);
        case PackageRouteKind.Error:
            return getErrorProps();
    }
}

async function getDocLatestVersionProps(
    parsedRoute: PackageRouteDocLatestVersion
): Promise<GetStaticPropsResult<PackagePagePropsDocs | PackagePagePropsError>> {
    try {
        const { name } = parsedRoute;
        const info = await packageAnalyzer.analyzeRegistryPackage(name);

        return {
            props: {
                kind: PackagePageKind.Docs,
                info: cleanObject(info),
                createdAt: now(),
            },
            revalidate: hour,
        };
    } catch {
        return getErrorProps({
            message: 'Package not found',
            revalidate: 10 * minute,
        });
    }
}

async function getDocFixedVersionProps(
    parsedRoute: PackageRouteDocFixedVersion
): Promise<GetStaticPropsResult<PackagePagePropsDocs | PackagePagePropsError>> {
    try {
        const { name, version } = parsedRoute;
        const info = await packageAnalyzer.analyzeRegistryPackage(
            name,
            version
        );

        return {
            props: {
                kind: PackagePageKind.Docs,
                info: cleanObject(info),
                createdAt: now(),
            },
            revalidate: week,
        };
    } catch {
        return getErrorProps({
            message: 'Package version not found',
            revalidate: 10 * minute,
        });
    }
}

async function getAvailableVersionsProps({
    name,
}: PackageRouteAvailableVersions): Promise<
    GetStaticPropsResult<
        PackagePagePropsAvailableVersions | PackagePagePropsError
    >
> {
    try {
        const packument = await registry.getPackument(name);

        return {
            props: {
                kind: PackagePageKind.AvailableVersions,
                packument: cleanObject(packument),
                createdAt: now(),
            },
            revalidate: hour,
        };
    } catch {
        return getErrorProps({
            message: 'Package not found',
            revalidate: 10 * minute,
        });
    }
}

function getErrorProps({
    message = 'Page not found',
    revalidate,
}: {
    message?: string;
    revalidate?: number | boolean;
} = {}): GetStaticPropsResult<PackagePagePropsError> {
    return {
        props: {
            kind: PackagePageKind.Error,
            message,
        },
        revalidate,
    };
}

function now(): string {
    return new Date().toISOString();
}
