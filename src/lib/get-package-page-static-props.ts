import {
    PackageAnalyzer,
    RegistryPackageInfo,
} from '@jsdocs-io/package-analyzer';
import { GetStaticPropsResult } from 'next';
import { Registry } from 'query-registry';
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
    registry,
    packageAnalyzer,
    storage,
    currentPackageAnalyzerVersion,
}: {
    route: string;
    registry: Registry;
    packageAnalyzer: PackageAnalyzer;
    storage: Storage;
    currentPackageAnalyzerVersion?: string;
}): Promise<GetStaticPropsResult<PackagePageProps>> {
    const parsedRoute = parsePackageRoute({ route });

    switch (parsedRoute.kind) {
        case PackageRouteKind.DocLatestVersion:
            return getDocLatestVersionRedirect({ parsedRoute, registry });
        case PackageRouteKind.DocFixedVersion:
            return getDocFixedVersionProps({
                parsedRoute,
                packageAnalyzer,
                storage,
                currentPackageAnalyzerVersion,
            });
        case PackageRouteKind.AvailableVersions:
            return getAvailableVersionsProps({ parsedRoute, registry });
        case PackageRouteKind.Error:
            return getErrorProps();
    }
}

async function getDocLatestVersionRedirect({
    parsedRoute,
    registry,
}: {
    parsedRoute: PackageRouteDocLatestVersion;
    registry: Registry;
}): Promise<GetStaticPropsResult<PackagePagePropsError>> {
    try {
        const { name } = parsedRoute;
        const { version } = await registry.getPackageManifest(name);

        return {
            redirect: {
                destination: `/package/${name}/v/${version}`,
                permanent: false,
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

async function getDocFixedVersionProps({
    parsedRoute,
    packageAnalyzer,
    storage,
    currentPackageAnalyzerVersion,
}: {
    parsedRoute: PackageRouteDocFixedVersion;
    packageAnalyzer: PackageAnalyzer;
    storage: Storage;
    currentPackageAnalyzerVersion?: string;
}): Promise<
    GetStaticPropsResult<PackagePagePropsDocs | PackagePagePropsError>
> {
    try {
        const { name, version } = parsedRoute;

        const objectName = `${name}/${version}.json`;
        const storedInfo = await storage.getObject<RegistryPackageInfo>({
            name: objectName,
        });

        // Use stored info only if it was extracted by the latest package analyzer
        if (
            storedInfo &&
            storedInfo.packageAnalyzerVersion &&
            storedInfo.packageAnalyzerVersion === currentPackageAnalyzerVersion
        ) {
            return {
                props: {
                    kind: PackagePageKind.Docs,
                    info: cleanObject(storedInfo),
                    createdAt: storedInfo.createdAt,
                },
            };
        }

        const info = await packageAnalyzer.analyzeRegistryPackage(
            name,
            version
        );

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
            message: 'Package version not found',
            revalidate: 10 * minute,
        });
    }
}

async function getAvailableVersionsProps({
    parsedRoute,
    registry,
}: {
    parsedRoute: PackageRouteAvailableVersions;
    registry: Registry;
}): Promise<
    GetStaticPropsResult<
        PackagePagePropsAvailableVersions | PackagePagePropsError
    >
> {
    try {
        const { name } = parsedRoute;
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
