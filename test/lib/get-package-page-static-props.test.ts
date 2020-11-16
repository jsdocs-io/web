import { getPackagePageStaticProps } from '../../src/lib/get-package-page-static-props';
import { PackagePageKind } from '../../src/lib/package-page-props';
import { hour, minute } from '../../src/lib/revalidate-times';

describe('getPackagePageStaticProps', () => {
    it('returns the redirect URL (latest version)', async () => {
        expect.assertions(1);

        const wantedManifest = {
            name: 'foo',
            version: '1.0.0',
        };

        const mockRegistry = {
            getPackageManifest() {
                return wantedManifest;
            },
        };

        const props = await getPackagePageStaticProps({
            route: '/foo',
            registry: mockRegistry as any,
            packageAnalyzer: {} as any,
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

        const mockRegistry = {
            getPackageManifest() {
                throw new Error();
            },
        };

        const props = await getPackagePageStaticProps({
            route: '/foo',
            registry: mockRegistry as any,
            packageAnalyzer: {} as any,
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

        const mockPackageAnalyzer = {
            analyzeRegistryPackage() {
                return wantedInfo;
            },
        };

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
            registry: {} as any,
            packageAnalyzer: mockPackageAnalyzer as any,
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

        const mockPackageAnalyzer = {
            analyzeRegistryPackage() {
                throw new Error();
            },
        };

        const props = await getPackagePageStaticProps({
            route: '/foo/v/1.0.0',
            registry: {} as any,
            packageAnalyzer: mockPackageAnalyzer as any,
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

        const mockRegistry = {
            getPackument() {
                return wantedPackument;
            },
        };

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
            registry: mockRegistry as any,
            packageAnalyzer: {} as any,
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

        const mockRegistry = {
            getPackument() {
                throw new Error();
            },
        };

        const props = await getPackagePageStaticProps({
            route: '/foo/versions',
            registry: mockRegistry as any,
            packageAnalyzer: {} as any,
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

        const props = await getPackagePageStaticProps({
            route: '/!',
            registry: {} as any,
            packageAnalyzer: {} as any,
        });

        expect(props).toMatchObject({
            props: {
                kind: PackagePageKind.Error,
                message: 'Page not found',
            },
        });

        expect(props).toHaveProperty('revalidate');
    });
});
