import { RegistryPackageInfo } from '@jsdocs-io/package-analyzer';
import { Packument } from 'query-registry';

export type PackagePageProps =
    | PackagePagePropsDocs
    | PackagePagePropsAvailableVersions
    | PackagePagePropsError;

export interface PackagePagePropsDocs {
    readonly kind: PackagePageKind.Docs;
    readonly info: RegistryPackageInfo;
    readonly createdAt: string;
}

export interface PackagePagePropsAvailableVersions {
    readonly kind: PackagePageKind.AvailableVersions;
    readonly packument: Packument;
    readonly createdAt: string;
}

export interface PackagePagePropsError {
    readonly kind: PackagePageKind.Error;
    readonly message?: string;
}

export enum PackagePageKind {
    /** Package documentation page (latest or specific version) */
    Docs = 'Docs',

    /** Package versions and dist tags */
    AvailableVersions = 'AvailableVersions',

    /** Error page (invalid route, package not found, version not found) */
    Error = 'Error',
}
