import { GetStaticPropsResult } from 'next';
import {
    getPackagePageAvailableVersionsProps,
    PackagePagePropsAvailableVersions,
} from './get-package-page-available-versions-props';
import {
    getPackagePageDocsProps,
    PackagePagePropsDocs,
} from './get-package-page-docs-props';
import {
    getPackagePageErrorProps,
    PackagePagePropsError,
} from './get-package-page-error-props';
import { getPackagePageLatestVersionRedirect } from './get-package-page-latest-version-redirect';
import { PackageRouteKind, parsePackageRoute } from './parse-package-route';

export type PackagePageProps =
    | PackagePagePropsDocs
    | PackagePagePropsAvailableVersions
    | PackagePagePropsError;

export async function getPackagePageStaticProps({
    route: rawRoute,
}: {
    route: string;
}): Promise<GetStaticPropsResult<PackagePageProps>> {
    const route = parsePackageRoute({ route: rawRoute });
    switch (route.kind) {
        case PackageRouteKind.DocLatestVersion:
            return getPackagePageLatestVersionRedirect({ route });
        case PackageRouteKind.DocFixedVersion:
            return getPackagePageDocsProps({ route });
        case PackageRouteKind.AvailableVersions:
            return getPackagePageAvailableVersionsProps({ route });
        case PackageRouteKind.Error:
            return getPackagePageErrorProps();
    }
}
