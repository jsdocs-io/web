import { mocked } from 'ts-jest/utils';
import { getPackagePageStaticProps } from '../../src/lib/get-package-page-static-props';
import { packageAnalyzer } from '../../src/lib/package-analyzer';
import { PackagePageKind } from '../../src/lib/package-page-props';
import { registry } from '../../src/lib/registry';
import { hour, minute } from '../../src/lib/revalidate-times';

jest.mock('../../src/lib/registry');
jest.mock('../../src/lib/package-analyzer');

const mockedRegistry = mocked(registry, true);
const mockedPackageAnalyzer = mocked(packageAnalyzer, true);

describe('getPackagePageStaticProps', () => {
    it('returns the redirect URL (latest version)', async () => {
        expect.assertions(1);

        const wantedManifest = {
            name: 'foo',
            version: '1.0.0',
        };

        mockedRegistry.getPackageManifest.mockImplementation(async () => {
            return wantedManifest as any;
        });

        const props = await getPackagePageStaticProps({
            route: '/foo',
        });

        expect(props).toMatchObject({
            redirect: {
                destination: '/package/foo/v/1.0.0',
                permanent: false,
            },
            revalidate: hour,
        });
    });

    it('returns the error props if the redirect URL is not found (latest version)', async () => {
        expect.assertions(1);

        mockedRegistry.getPackageManifest.mockImplementation(async () => {
            throw new Error();
        });

        const props = await getPackagePageStaticProps({
            route: '/foo',
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package not found',
            },
            revalidate: 10 * minute,
        });
    });

    it('returns the docs props (fixed version)', async () => {
        expect.assertions(2);

        const wantedInfo = {
            id: 'foo',
        };

        mockedPackageAnalyzer.analyzeRegistryPackage.mockImplementation(
            async () => {
                return wantedInfo as any;
            }
        );

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
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

        mockedPackageAnalyzer.analyzeRegistryPackage.mockImplementation(
            async () => {
                throw new Error();
            }
        );

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package version not found',
            },
            revalidate: 10 * minute,
        });
    });

    it('returns the available versions props', async () => {
        expect.assertions(2);

        const wantedPackument = {
            id: 'foo',
        };

        mockedRegistry.getPackument.mockImplementation(async () => {
            return wantedPackument as any;
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
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

        mockedRegistry.getPackument.mockImplementation(async () => {
            throw new Error();
        });

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Package not found',
            },
            revalidate: 10 * minute,
        });
    });

    it('returns error props for an invalid package route', async () => {
        expect.assertions(2);

        const props = await getPackagePageStaticProps({ route: '/!' });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Page not found',
            },
        });

        expect(props).toHaveProperty('revalidate');
    });
});
