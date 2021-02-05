import { GetStaticPropsResult } from 'next';
import { getPackageManifest, getPackument } from 'query-registry';
import { cleanObject } from './clean-object';
import { getRegistryPackageInfo } from './get-registry-package-info';
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
import { hour, minute, week } from './revalidate-times';

export async function getPackagePageStaticProps({
    route,
}: {
    route: string;
}): Promise<GetStaticPropsResult<PackagePageProps>> {
    const parsedRoute = parsePackageRoute({ route });

    switch (parsedRoute.kind) {
        case PackageRouteKind.DocLatestVersion:
            return getDocLatestVersionRedirect({ parsedRoute });
        case PackageRouteKind.DocFixedVersion:
            return getDocFixedVersionProps({ parsedRoute });
        case PackageRouteKind.AvailableVersions:
            return getAvailableVersionsProps({ parsedRoute });
        case PackageRouteKind.Error:
            return getErrorProps();
    }
}

async function getDocLatestVersionRedirect({
    parsedRoute,
}: {
    parsedRoute: PackageRouteDocLatestVersion;
}): Promise<GetStaticPropsResult<PackagePagePropsError>> {
    try {
        const { name } = parsedRoute;
        const { version } = await getPackageManifest({ name });

        return {
            redirect: {
                destination: `/package/${name}/v/${version}`,
                permanent: false,
            },
            revalidate: hour,
        };
    } catch {
        return getErrorProps({
            message: 'Package Not Found',
            revalidate: 10 * minute,
        });
    }
}

async function getDocFixedVersionProps({
    parsedRoute,
}: {
    parsedRoute: PackageRouteDocFixedVersion;
}): Promise<
    GetStaticPropsResult<PackagePagePropsDocs | PackagePagePropsError>
> {
    try {
        const { name, version } = parsedRoute;
        const info = await getRegistryPackageInfo({ name, version });

        return {
            props: {
                kind: PackagePageKind.Docs,
                info: cleanObject(info),
                createdAt: info.createdAt,
            },
        };
    } catch {
        return getErrorProps({
            message: 'Package Version Not Found',
            revalidate: 10 * minute,
        });
    }
}

async function getAvailableVersionsProps({
    parsedRoute,
}: {
    parsedRoute: PackageRouteAvailableVersions;
}): Promise<
    GetStaticPropsResult<
        PackagePagePropsAvailableVersions | PackagePagePropsError
    >
> {
    try {
        const { name } = parsedRoute;
        const packument = await getPackument({ name });

        return {
            props: {
                kind: PackagePageKind.AvailableVersions,
                packument: cleanObject(packument),
                createdAt: new Date().toISOString(),
            },
            revalidate: hour,
        };
    } catch {
        return getErrorProps({
            message: 'Package Not Found',
            revalidate: 10 * minute,
        });
    }
}

function getErrorProps({
    message = 'Page Not Found',
    revalidate = week,
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
