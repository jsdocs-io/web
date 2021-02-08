import { GetStaticPropsResult } from 'next';
import { getPackageManifest } from 'query-registry';
import {
    getPackagePageErrorProps,
    PackagePagePropsError,
} from './get-package-page-error-props';
import { PackageRouteDocLatestVersion } from './parse-package-route';
import { hour, minute } from './revalidate-times';

export async function getPackagePageLatestVersionRedirect({
    route,
}: {
    route: PackageRouteDocLatestVersion;
}): Promise<GetStaticPropsResult<PackagePagePropsError>> {
    try {
        const { name } = route;
        const { version } = await getPackageManifest({ name });

        return {
            redirect: {
                destination: `/package/${name}/v/${version}`,
                permanent: false,
            },
            revalidate: hour,
        };
    } catch {
        return getPackagePageErrorProps({
            message: 'Package Not Found',
            revalidate: 10 * minute,
        });
    }
}
