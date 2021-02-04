import { analyzeRegistryPackage } from '@jsdocs-io/package-analyzer';
import { getPackageManifest, getPackument } from 'query-registry';
import { mocked } from 'ts-jest/utils';
import { getPackagePageStaticProps } from '../../src/lib/get-package-page-static-props';
import { PackagePageKind } from '../../src/lib/package-page-props';
import { hour, minute } from '../../src/lib/revalidate-times';

jest.mock('query-registry', () => ({
    getPackument: jest.fn(),
    getPackageManifest: jest.fn(),
}));

jest.mock('@jsdocs-io/package-analyzer', () => ({
    analyzeRegistryPackage: jest.fn(),
}));

const mockedGetPackument = mocked(getPackument, true);
const mockedGetPackageManifest = mocked(getPackageManifest, true);
const mockedAnalyzeRegistryPackage = mocked(analyzeRegistryPackage, true);

describe('getPackagePageStaticProps', () => {
    it('returns the redirect URL (latest version)', async () => {
        expect.assertions(1);

        const wantedManifest = {
            name: 'foo',
            version: '1.0.0',
        };

        mockedGetPackageManifest.mockImplementation(async () => {
            return wantedManifest as any;
        });

        const props = await getPackagePageStaticProps({
            route: '/foo',
            storage: {} as any,
        });

        expect(props).toStrictEqual({
            redirect: {
                destination: '/package/foo/v/1.0.0',
                permanent: false,
            },
            revalidate: hour,
        });
    });

    it('returns the error props if the redirect URL is not found (latest version)', async () => {
        expect.assertions(1);

        mockedGetPackageManifest.mockImplementation(async () => {
            throw new Error();
        });

        const props = await getPackagePageStaticProps({
            route: '/foo',
            storage: {} as any,
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package Not Found',
            },
            revalidate: 10 * minute,
        });
    });

    it('returns the docs props (fixed version)', async () => {
        expect.assertions(2);

        const wantedInfo = {
            id: 'foo',
        };

        mockedAnalyzeRegistryPackage.mockImplementation(() => {
            return wantedInfo as any;
        });

        const mockStorage = {
            getObject() {
                return undefined;
            },
            putObject() {},
        };

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
            storage: mockStorage as any,
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Docs,
                info: wantedInfo,
            },
        });

        expect(props).toHaveProperty('props.createdAt');
    });

    it('returns the stored docs props (fixed version)', async () => {
        expect.assertions(2);

        const wantedInfo = {
            id: 'foo',
            packageAnalyzerVersion: '1.0.0',
        };

        const mockStorage = {
            getObject() {
                return wantedInfo;
            },
            putObject() {},
        };

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
            storage: mockStorage as any,
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Docs,
                info: wantedInfo,
            },
        });

        expect(props).toHaveProperty('props.createdAt');
    });

    it('returns the error props if the docs props package version is not found (fixed version)', async () => {
        expect.assertions(1);

        mockedAnalyzeRegistryPackage.mockImplementation(() => {
            throw new Error();
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
            storage: {} as any,
        });

        expect(props).toStrictEqual({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package Version Not Found',
            },
            revalidate: 10 * minute,
        });
    });

    it('returns the available versions props', async () => {
        expect.assertions(2);

        const wantedPackument = {
            id: 'foo',
        };

        mockedGetPackument.mockImplementation(async () => {
            return wantedPackument as any;
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
            storage: {} as any,
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.AvailableVersions,
                packument: wantedPackument,
            },
            revalidate: hour,
        });

        expect(props).toHaveProperty('props.createdAt');
    });

    it('returns the error props if the available versions props package is not found', async () => {
        expect.assertions(1);

        mockedGetPackument.mockImplementation(async () => {
            throw new Error();
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
            storage: {} as any,
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package Not Found',
            },
            revalidate: 10 * minute,
        });
    });

    it('returns error props for an invalid package route', async () => {
        expect.assertions(2);

        const props = await getPackagePageStaticProps({
            route: '/!',
            storage: {} as any,
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Page Not Found',
            },
        });

        expect(props).toHaveProperty('revalidate');
    });
});
