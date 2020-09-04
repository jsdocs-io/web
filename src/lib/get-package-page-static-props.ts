import { GetStaticPropsResult } from 'next';
import { Packument } from 'query-registry';
import { cleanObject } from './clean-object';
import {
    PackageRouteAvailableVersions,
    PackageRouteDocFixedVersion,
    PackageRouteDocLatestVersion,
    PackageRouteKind,
    parsePackageRoute,
} from './parse-package-route';
import { registry } from './registry';
import { hour, week } from './revalidate-time';

export type PackagePageProps =
    | PackagePagePropsDocLatestVersion
    | PackagePagePropsDocFixedVersion
    | PackagePagePropsAvailableVersions
    | PackagePagePropsError;

export interface PackagePagePropsDocLatestVersion {
    readonly kind: PackageRouteKind.DocLatestVersion;
}

export interface PackagePagePropsDocFixedVersion {
    readonly kind: PackageRouteKind.DocFixedVersion;
}

export interface PackagePagePropsAvailableVersions {
    readonly kind: PackageRouteKind.AvailableVersions;
    readonly packument: Packument;
    readonly createdAt: string;
}

export interface PackagePagePropsError {
    readonly kind: PackageRouteKind.Error;
}

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
): Promise<GetStaticPropsResult<PackagePagePropsDocLatestVersion>> {
    console.table(parsedRoute);

    return {
        props: {
            kind: PackageRouteKind.DocLatestVersion,
        },
        revalidate: week,
    };
}

async function getDocFixedVersionProps(
    parsedRoute: PackageRouteDocFixedVersion
): Promise<GetStaticPropsResult<PackagePagePropsDocFixedVersion>> {
    console.table(parsedRoute);

    return {
        props: {
            kind: PackageRouteKind.DocFixedVersion,
        },
        revalidate: week,
    };
}

async function getAvailableVersionsProps({
    name,
}: PackageRouteAvailableVersions): Promise<
    GetStaticPropsResult<PackagePagePropsAvailableVersions>
> {
    const packument = await registry.getPackument(name);

    return {
        props: {
            kind: PackageRouteKind.AvailableVersions,
            packument: cleanObject(packument),
            createdAt: now(),
        },
        revalidate: hour,
    };
}

function getErrorProps(): GetStaticPropsResult<PackagePagePropsError> {
    return {
        props: {
            kind: PackageRouteKind.Error,
        },
    };
}

function now(): string {
    return new Date().toISOString();
}
