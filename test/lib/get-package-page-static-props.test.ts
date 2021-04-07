import { analyzeRegistryPackage } from '@jsdocs-io/extractor';
import { getPackument } from 'query-registry';
import { mocked } from 'ts-jest/utils';
import { getPackagePageStaticProps } from '../../src/lib/get-package-page-static-props';
import { PackagePageKind } from '../../src/lib/package-page-kind';
import { loadRegistryPackageInfo } from '../../src/lib/registry-package-info-storage';
import { day, hour, minute, week } from '../../src/lib/revalidate-times';

jest.mock('query-registry', () => ({
    getPackument: jest.fn(),
    getPackageManifest: jest.fn(),
}));
const mockedGetPackument = mocked(getPackument, true);

jest.mock('@jsdocs-io/extractor', () => ({
    analyzeRegistryPackage: jest.fn(),
}));
const mockedAnalyzeRegistryPackage = mocked(analyzeRegistryPackage, true);

jest.mock('../../src/lib/registry-package-info-storage', () => ({
    loadRegistryPackageInfo: jest.fn(),
    storeRegistryPackageInfo: jest.fn(),
}));
const mockedLoadRegistryPackageInfo = mocked(loadRegistryPackageInfo, true);

describe('getPackagePageStaticProps:DocLatestVersion', () => {
    it('returns the fresh docs for the latest package version', async () => {
        expect.assertions(1);

        const wantedPackument = {
            name: 'foo',
            distTags: { latest: '1.0.0' },
        };

        mockedGetPackument.mockImplementation(async () => {
            return wantedPackument as any;
        });

        const info = {
            id: 'foo@1.0.0',
            manifest: {
                name: 'foo',
                version: '1.0.0',
            },
            api: {
                overview: '/** Foo */',
                declarations: {
                    variables: [],
                    functions: [],
                    classes: [],
                    interfaces: [],
                    enums: [],
                    typeAliases: [],
                    namespaces: [],
                },
                files: [],
            },
            createdAt: '2020-01-01',
            elapsed: 1000,
        };

        mockedLoadRegistryPackageInfo.mockImplementation(async () => {
            return undefined;
        });

        mockedAnalyzeRegistryPackage.mockImplementation(() => {
            return info as any;
        });

        const props = await getPackagePageStaticProps({
            route: '/foo',
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Docs,
                data: {
                    manifest: info.manifest,
                    api: info.api,
                    elapsed: info.elapsed,
                },
                createdAt: info.createdAt,
            },
            revalidate: day,
        });
    });

    it('returns an error page if the package is not found', async () => {
        expect.assertions(1);

        mockedGetPackument.mockImplementation(async () => {
            throw new Error('package not found');
        });

        const props = await getPackagePageStaticProps({
            route: '/foo',
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package Not Found',
            },
            revalidate: 10 * minute,
        });
    });
});

describe('getPackagePageStaticProps:DocFixedVersion', () => {
    it('returns the fresh docs for a package', async () => {
        expect.assertions(1);

        const wantedPackument = {
            name: 'foo',
            distTags: { latest: '1.0.0' },
        };

        mockedGetPackument.mockImplementation(async () => {
            return wantedPackument as any;
        });

        const info = {
            id: 'foo@1.0.0',
            manifest: {
                name: 'foo',
                version: '1.0.0',
            },
            api: {
                overview: '/** Foo */',
                declarations: {
                    variables: [],
                    functions: [],
                    classes: [],
                    interfaces: [],
                    enums: [],
                    typeAliases: [],
                    namespaces: [],
                },
                files: [],
            },
            createdAt: '2020-01-01',
            elapsed: 1000,
        };

        mockedLoadRegistryPackageInfo.mockImplementation(async () => {
            return undefined;
        });

        mockedAnalyzeRegistryPackage.mockImplementation(() => {
            return info as any;
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Docs,
                data: {
                    manifest: info.manifest,
                    api: info.api,
                    elapsed: info.elapsed,
                },
                createdAt: info.createdAt,
            },
            revalidate: undefined,
        });
    });

    it('returns the stored docs for a package', async () => {
        expect.assertions(1);

        const wantedPackument = {
            name: 'foo',
            distTags: { latest: '1.0.0' },
        };

        mockedGetPackument.mockImplementation(async () => {
            return wantedPackument as any;
        });

        const info = {
            id: 'foo@1.0.0',
            manifest: {
                name: 'foo',
                version: '1.0.0',
            },
            createdAt: '2020-01-01',
            elapsed: 1000,
        };

        mockedLoadRegistryPackageInfo.mockImplementation(async () => {
            return info as any;
        });

        mockedAnalyzeRegistryPackage.mockImplementation(() => {
            throw new Error('should not be called');
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Docs,
                data: {
                    manifest: info.manifest,
                    elapsed: info.elapsed,
                },
                createdAt: info.createdAt,
            },
            revalidate: undefined,
        });
    });

    it('returns an error page if the package version is not found', async () => {
        expect.assertions(1);

        mockedGetPackument.mockImplementation(async () => {
            throw new Error('package not found');
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package Version Not Found',
            },
            revalidate: 10 * minute,
        });
    });
});

describe('getPackagePageStaticProps:AvailableVersions', () => {
    it('returns the available versions of a package', async () => {
        expect.assertions(2);

        const packument = {
            id: 'foo',
            name: 'foo',
            distTags: {
                latest: '1.0.0',
            },
            versionsToTimestamps: {
                '1.0.0': '2020-01-01',
            },
        };

        mockedGetPackument.mockImplementation(async () => {
            return packument as any;
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.AvailableVersions,
                data: {
                    name: packument.name,
                    distTags: packument.distTags,
                    versionsToTimestamps: packument.versionsToTimestamps,
                },
            },
            revalidate: hour,
        });

        expect(props).toHaveProperty('props.createdAt');
    });

    it('returns an error page if the package is not found', async () => {
        expect.assertions(1);

        mockedGetPackument.mockImplementation(async () => {
            throw new Error('package not found');
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package Not Found',
            },
            revalidate: 10 * minute,
        });
    });
});

describe('getPackagePageStaticProps:Error', () => {
    it('returns an error page for invalid routes', async () => {
        expect.assertions(1);

        const props = await getPackagePageStaticProps({
            route: '/<>',
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Error,
                message: 'Page Not Found',
            },
            revalidate: week,
        });
    });
});
