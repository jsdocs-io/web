import { match } from 'path-to-regexp';
import validateNpmPackageName from 'validate-npm-package-name';

const matchLatestDocRoute = match('/:scope(@[^/]+)?/:name([^@/]+)');
const matchVersionDocRoute = match('/:scope(@[^/]+)?/:name([^@/]+)/v/:version');
const matchVersionsRoute = match('/:scope(@[^/]+)?/:name([^@/]+)/versions');

export interface ParsedPackageRoute {
    readonly kind: PackageRouteKind;
    readonly name: string;
    readonly version?: string;
}

export enum PackageRouteKind {
    LatestDocRoute,
    VersionDocRoute,
    VersionsRoute,
}

interface PackageNameAndVersionParams extends PackageNameParams {
    readonly version: string;
}

interface PackageNameParams {
    readonly scope?: string;
    readonly name: string;
}

export function parsePackageRoute({
    route,
}: {
    route: string;
}): ParsedPackageRoute | undefined {
    return (
        parseLatestDocRoute({ route }) ??
        parseVersionDocRoute({ route }) ??
        parseVersionsRoute({ route })
    );
}

function parseLatestDocRoute({
    route,
}: {
    route: string;
}): ParsedPackageRoute | undefined {
    const matched = matchLatestDocRoute(route);
    if (!matched) {
        return undefined;
    }

    const params = matched.params as PackageNameParams;
    const name = getPackageName(params);
    if (!isValidPackageName({ name })) {
        return undefined;
    }

    return {
        kind: PackageRouteKind.LatestDocRoute,
        name,
    };
}

function parseVersionDocRoute({
    route,
}: {
    route: string;
}): ParsedPackageRoute | undefined {
    const matched = matchVersionDocRoute(route);
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
        kind: PackageRouteKind.VersionDocRoute,
        name,
        version,
    };
}

function parseVersionsRoute({
    route,
}: {
    route: string;
}): ParsedPackageRoute | undefined {
    const matched = matchVersionsRoute(route);
    if (!matched) {
        return undefined;
    }

    const params = matched.params as PackageNameParams;
    const name = getPackageName(params);
    if (!isValidPackageName({ name })) {
        return undefined;
    }

    return {
        kind: PackageRouteKind.VersionsRoute,
        name,
    };
}

function getPackageName({ scope, name }: PackageNameParams): string {
    return [scope, name].filter(Boolean).join('/');
}

function isValidPackageName({ name }: { name: string }): boolean {
    return validateNpmPackageName(name).validForNewPackages;
}
