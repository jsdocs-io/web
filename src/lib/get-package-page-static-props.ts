import { GetStaticPropsResult } from "next";
import getPackagePageAvailableVersionsProps, {
  PackagePagePropsAvailableVersions,
} from "./get-package-page-available-versions-props";
import getPackagePageDocsProps, {
  PackagePagePropsDocs,
} from "./get-package-page-docs-props";
import { PackagePagePropsError } from "./get-package-page-error-props";
import parsePackageRoute, { PackageRouteKind } from "./parse-package-route";
import { week } from "./revalidate-times";

export type PackagePageProps =
  | PackagePagePropsDocs
  | PackagePagePropsAvailableVersions
  | PackagePagePropsError;

const getPackagePageStaticProps = async ({
  route: rawRoute,
}: {
  route: string;
}): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const route = parsePackageRoute({ route: rawRoute });
  switch (route.kind) {
    case PackageRouteKind.DocLatestVersion:
      return getPackagePageDocsProps({ route });
    case PackageRouteKind.DocFixedVersion:
      return {
        notFound: true,
        revalidate: week,
      };
    case PackageRouteKind.AvailableVersions:
      return getPackagePageAvailableVersionsProps({ route });
    case PackageRouteKind.Error:
      return {
        notFound: true,
        revalidate: week,
      };
    default:
      return {
        notFound: true,
        revalidate: week,
      };
  }
};

export default getPackagePageStaticProps;
