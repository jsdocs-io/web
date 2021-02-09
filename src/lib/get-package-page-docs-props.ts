import { PackageAPI, RegistryPackageInfo } from '@jsdocs-io/package-analyzer';
import cleanDeep from 'clean-deep';
import { pick } from 'filter-anything';
import { GetStaticPropsResult } from 'next';
import { PackageManifest } from 'query-registry';
import { cleanObject } from './clean-object';
import { flattenPackageAPI } from './flatten-package-api';
import {
    getPackagePageErrorProps,
    PackagePagePropsError,
} from './get-package-page-error-props';
import { getRegistryPackageInfo } from './get-registry-package-info';
import { PackagePageKind } from './package-page-kind';
import { PackageRouteDocFixedVersion } from './parse-package-route';
import { minute } from './revalidate-times';

export interface PackagePagePropsDocs {
    readonly kind: PackagePageKind.Docs;
    readonly data: MinimalRegistryPackageInfo;
    readonly createdAt: string;
}

export interface MinimalRegistryPackageInfo {
    readonly manifest: MinimalPackageManifest;
    readonly api?: PackageAPI;
    readonly elapsed: number;
}

export type MinimalPackageManifest = Pick<
    PackageManifest,
    | 'id'
    | 'name'
    | 'version'
    | 'description'
    | 'definitelyTypedName'
    | 'untypedName'
    | 'gitRepository'
    | 'license'
    | 'dependencies'
    | 'devDependencies'
    | 'peerDependencies'
    | 'dist'
    | 'createdAt'
>;

export async function getPackagePageDocsProps({
    route,
}: {
    route: PackageRouteDocFixedVersion;
}): Promise<
    GetStaticPropsResult<PackagePagePropsDocs | PackagePagePropsError>
> {
    try {
        const { name, version } = route;
        const info = await getRegistryPackageInfo({ name, version });
        const data = getMinimalRegistryPackageInfo({ info });

        return {
            props: {
                kind: PackagePageKind.Docs,
                data: cleanObject(data),
                createdAt: info.createdAt,
            },
        };
    } catch {
        return getPackagePageErrorProps({
            message: 'Package Version Not Found',
            revalidate: 10 * minute,
        });
    }
}

function getMinimalRegistryPackageInfo({
    info,
}: {
    info: RegistryPackageInfo;
}): MinimalRegistryPackageInfo {
    const { manifest: fullManifest, api: fullAPI, elapsed } = info;
    const manifest = getMinimalPackageManifest({ fullManifest });
    const minimalAPI = getMinimalPackageAPI({ fullAPI });
    const api = flattenPackageAPI({ api: minimalAPI });

    return { manifest, api, elapsed };
}

function getMinimalPackageManifest({
    fullManifest,
}: {
    fullManifest: PackageManifest;
}): MinimalPackageManifest {
    return (pick(fullManifest, [
        'id',
        'name',
        'version',
        'description',
        'definitelyTypedName',
        'untypedName',
        'gitRepository.url',
        'license',
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'dist.unpackedSize',
        'createdAt',
    ]) as unknown) as MinimalPackageManifest;
}

function getMinimalPackageAPI({
    fullAPI,
}: {
    fullAPI?: PackageAPI;
}): PackageAPI | undefined {
    if (!fullAPI) {
        return undefined;
    }

    // Not anymore a proper `PackageAPI` with respect to `Declaration` kinds!
    // For example, a `VariableDeclaration` won't have the `variableKind` property.
    return cleanDeep(fullAPI, {
        cleanKeys: [
            // VariableDeclaration, FunctionDeclaration,
            // ClassPropertyDeclaration, ClassMethodDeclaration,
            // InterfacePropertyDeclaration, InterfaceMethodDeclaration
            'type',
            // VariableDeclaration
            'variableKind',
            // ClassDeclaration
            'isAbstract',
            // ClassPropertyDeclaration, ClassMethodDeclaration
            'isStatic',
            // InterfacePropertyDeclaration
            'isReadonly',
            // InterfacePropertyDeclaration
            'isOptional',
            // EnumDeclaration
            'isConst',
            // EnumMemberDeclaration
            'value',
        ],
        emptyArrays: false,
        emptyObjects: false,
        emptyStrings: false,
    }) as PackageAPI;
}
