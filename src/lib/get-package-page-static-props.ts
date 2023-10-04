import { GetStaticPropsResult } from "next";
import getPackagePageAvailableVersionsProps, {
  PackagePagePropsAvailableVersions,
} from "./get-package-page-available-versions-props";
import getPackagePageDocsProps, {
  PackagePagePropsDocs,
} from "./get-package-page-docs-props";
import getPackagePageErrorProps, {
  PackagePagePropsError,
} from "./get-package-page-error-props";
import parsePackageRoute, { PackageRouteKind } from "./parse-package-route";

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
      return getPackagePageErrorProps();
    case PackageRouteKind.AvailableVersions:
      return getPackagePageAvailableVersionsProps({ route });
    case PackageRouteKind.Error:
      return getPackagePageErrorProps();
  }
};

export default getPackagePageStaticProps;
