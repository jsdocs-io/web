import { match } from 'path-to-regexp';
import validateNpmPackageName from 'validate-npm-package-name';

const matchRouteDocLatestVersion = match('/:scope(@[^/]+)?/:name([^@/]+)');
const matchRouteDocFixedVersion = match(
    '/:scope(@[^/]+)?/:name([^@/]+)/v/:version'
);
const matchRouteAvailableVersions = match(
    '/:scope(@[^/]+)?/:name([^@/]+)/versions'
);

export type PackageRoute =
    | PackageRouteDocLatestVersion
    | PackageRouteDocFixedVersion
    | PackageRouteAvailableVersions
    | PackageRouteError;

export interface PackageRouteDocLatestVersion {
    readonly kind: PackageRouteKind.DocLatestVersion;
    readonly name: string;
}

export interface PackageRouteDocFixedVersion {
    readonly kind: PackageRouteKind.DocFixedVersion;
    readonly name: string;
    readonly version: string;
}

export interface PackageRouteAvailableVersions {
    readonly kind: PackageRouteKind.AvailableVersions;
    readonly name: string;
}

export interface PackageRouteError {
    readonly kind: PackageRouteKind.Error;
}

export enum PackageRouteKind {
    DocLatestVersion = 'DocLatestVersion',
    DocFixedVersion = 'DocFixedVersion',
    AvailableVersions = 'AvailableVersions',
    Error = 'Error',
}

interface PackageNameAndVersionParams extends PackageNameParams {
    readonly version: string;
}

interface PackageNameParams {
    readonly scope?: string;
    readonly name: string;
}

export function parsePackageRoute({ route }: { route: string }): PackageRoute {
    const errorRoute: PackageRouteError = {
        kind: PackageRouteKind.Error,
    };

    return (
        parseRouteDocLatestVersion({ route }) ??
        parseRouteDocFixedVersion({ route }) ??
        parseRouteAvailableVersions({ route }) ??
        errorRoute
    );
}

function parseRouteDocLatestVersion({
    route,
}: {
    route: string;
}): PackageRouteDocLatestVersion | undefined {
    const matched = matchRouteDocLatestVersion(route);
    if (!matched) {
        return undefined;
    }

    const params = matched.params as PackageNameParams;
    const name = getPackageName(params);
    if (!isValidPackageName({ name })) {
        return undefined;
    }

    return {
        kind: PackageRouteKind.DocLatestVersion,
        name,
    };
}

function parseRouteDocFixedVersion({
    route,
}: {
    route: string;
}): PackageRouteDocFixedVersion | undefined {
    const matched = matchRouteDocFixedVersion(route);
    if (!matched) {
        return undefined;
    }

    const params = matched.params as PackageNameAndVersionParams;
    const name = getPackageName(params);
    if (!isValidPackageName({ name })) {
        return undefined;
    }

    const { version } = params;

    return {
        kind: PackageRouteKind.DocFixedVersion,
        name,
        version,
    };
}

function parseRouteAvailableVersions({
    route,
}: {
    route: string;
}): PackageRouteAvailableVersions | undefined {
    const matched = matchRouteAvailableVersions(route);
    if (!matched) {
        return undefined;
    }

    const params = matched.params as PackageNameParams;
    const name = getPackageName(params);
    if (!isValidPackageName({ name })) {
        return undefined;
    }

    return {
        kind: PackageRouteKind.AvailableVersions,
        name,
    };
}

function getPackageName({ scope, name }: PackageNameParams): string {
    return [scope, name].filter(Boolean).join('/');
}

function isValidPackageName({ name }: { name: string }): boolean {
    const { validForOldPackages, validForNewPackages } =
        validateNpmPackageName(name);
    return validForNewPackages || validForOldPackages;
}
