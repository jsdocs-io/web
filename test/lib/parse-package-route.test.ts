import {
    PackageRouteKind,
    parsePackageRoute,
} from '../../src/lib/parse-package-route';

describe('parsePackageRoute', () => {
    it('parses the `/:scope?/:name` route', () => {
        expect(parsePackageRoute({ route: '/foo' })).toStrictEqual({
            kind: PackageRouteKind.DocLatestVersion,
            name: 'foo',
        });

        expect(parsePackageRoute({ route: '/foo/' })).toStrictEqual({
            kind: PackageRouteKind.DocLatestVersion,
            name: 'foo',
        });

        expect(parsePackageRoute({ route: '/@foo/bar' })).toStrictEqual({
            kind: PackageRouteKind.DocLatestVersion,
            name: '@foo/bar',
        });

        expect(parsePackageRoute({ route: '/@foo/bar/' })).toStrictEqual({
            kind: PackageRouteKind.DocLatestVersion,
            name: '@foo/bar',
        });
    });

    it('parses the `/:scope?/:name/v/:version` route', () => {
        expect(parsePackageRoute({ route: '/foo/v/1.0.0' })).toStrictEqual({
            kind: PackageRouteKind.DocFixedVersion,
            name: 'foo',
            version: '1.0.0',
        });

        expect(parsePackageRoute({ route: '/foo/v/1.0.0/' })).toStrictEqual({
            kind: PackageRouteKind.DocFixedVersion,
            name: 'foo',
            version: '1.0.0',
        });

        expect(parsePackageRoute({ route: '/foo/v/latest/' })).toStrictEqual({
            kind: PackageRouteKind.DocFixedVersion,
            name: 'foo',
            version: 'latest',
        });

        expect(parsePackageRoute({ route: '/@foo/bar/v/1.0.0' })).toStrictEqual(
            {
                kind: PackageRouteKind.DocFixedVersion,
                name: '@foo/bar',
                version: '1.0.0',
            }
        );

        expect(
            parsePackageRoute({ route: '/@foo/bar/v/1.0.0/' })
        ).toStrictEqual({
            kind: PackageRouteKind.DocFixedVersion,
            name: '@foo/bar',
            version: '1.0.0',
        });

        expect(
            parsePackageRoute({ route: '/@foo/bar/v/latest/' })
        ).toStrictEqual({
            kind: PackageRouteKind.DocFixedVersion,
            name: '@foo/bar',
            version: 'latest',
        });
    });

    it('parses the `/:scope?/:name/versions` route', () => {
        expect(parsePackageRoute({ route: '/foo/versions' })).toStrictEqual({
            kind: PackageRouteKind.AvailableVersions,
            name: 'foo',
        });

        expect(parsePackageRoute({ route: '/foo/versions/' })).toStrictEqual({
            kind: PackageRouteKind.AvailableVersions,
            name: 'foo',
        });

        expect(
            parsePackageRoute({ route: '/@foo/bar/versions' })
        ).toStrictEqual({
            kind: PackageRouteKind.AvailableVersions,
            name: '@foo/bar',
        });

        expect(
            parsePackageRoute({ route: '/@foo/bar/versions/' })
        ).toStrictEqual({
            kind: PackageRouteKind.AvailableVersions,
            name: '@foo/bar',
        });
    });

    it('parses invalid routes', () => {
        expect(parsePackageRoute({ route: '/<>' })).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(parsePackageRoute({ route: '/<>/v/1.0.0' })).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(parsePackageRoute({ route: '/<>/versions' })).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(parsePackageRoute({ route: '/foo/bar' })).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(parsePackageRoute({ route: '/foo/bar/baz' })).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(parsePackageRoute({ route: '/@foo' })).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(parsePackageRoute({ route: '/@foo/bar/baz' })).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(
            parsePackageRoute({ route: '/foo/v/1.0.0/invalid/extra/params' })
        ).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(
            parsePackageRoute({ route: '/foo/versions/invalid/extra/params' })
        ).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(
            parsePackageRoute({
                route: '/@foo/bar/v/1.0.0/invalid/extra/params',
            })
        ).toStrictEqual({
            kind: PackageRouteKind.Error,
        });

        expect(
            parsePackageRoute({
                route: '/@foo/bar/versions/invalid/extra/params',
            })
        ).toStrictEqual({
            kind: PackageRouteKind.Error,
        });
    });
});
