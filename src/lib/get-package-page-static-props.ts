import {
    analyzeRegistryPackage,
    RegistryPackageInfo,
} from '@jsdocs-io/package-analyzer';
import { version as packageAnalyzerVersion } from '@jsdocs-io/package-analyzer/package.json';
import { GetStaticPropsResult } from 'next';
import { getPackageManifest, getPackument } from 'query-registry';
import { cleanObject } from './clean-object';
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
import { Storage } from './storage';

export async function getPackagePageStaticProps({
    route,
    storage,
}: {
    route: string;
    storage: Storage;
}): Promise<GetStaticPropsResult<PackagePageProps>> {
    const parsedRoute = parsePackageRoute({ route });

    switch (parsedRoute.kind) {
        case PackageRouteKind.DocLatestVersion:
            return getDocLatestVersionRedirect({ parsedRoute });
        case PackageRouteKind.DocFixedVersion:
            return getDocFixedVersionProps({
                parsedRoute,
                storage,
            });
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
    storage,
}: {
    parsedRoute: PackageRouteDocFixedVersion;
    storage: Storage;
}): Promise<
    GetStaticPropsResult<PackagePagePropsDocs | PackagePagePropsError>
> {
    try {
        const { name, version } = parsedRoute;

        const objectName = `registry-package-info/${packageAnalyzerVersion}/${name}/${version}.json`;
        const storedInfo = await storage.getObject<RegistryPackageInfo>({
            name: objectName,
        });

        if (storedInfo) {
            return {
                props: {
                    kind: PackagePageKind.Docs,
                    info: cleanObject(storedInfo),
                    createdAt: storedInfo.createdAt,
                },
            };
        }

        const info = await analyzeRegistryPackage({ name, version });

        // Store fresh info for future use
        await storage.putObject({
            name: objectName,
            obj: info,
        });

        return {
            props: {
                kind: PackagePageKind.Docs,
                info: cleanObject(info),
                createdAt: now(),
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
                createdAt: now(),
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

function now(): string {
    return new Date().toISOString();
}
