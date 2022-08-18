import { pick } from "filter-anything";
import { GetStaticPropsResult } from "next";
import { getPackument, Packument } from "query-registry";
import { cleanObject } from "./clean-object";
import {
  getPackagePageErrorProps,
  PackagePagePropsError,
} from "./get-package-page-error-props";
import { PackagePageKind } from "./package-page-kind";
import { PackageRouteAvailableVersions } from "./parse-package-route";
import { hour, minute } from "./revalidate-times";

export interface PackagePagePropsAvailableVersions {
  readonly kind: PackagePageKind.AvailableVersions;
  readonly data: MinimalPackument;
  readonly createdAt: string;
}

export type MinimalPackument = Pick<
  Packument,
  "name" | "gitRepository" | "distTags" | "versionsToTimestamps" | "license"
>;

export async function getPackagePageAvailableVersionsProps({
  route,
}: {
  route: PackageRouteAvailableVersions;
}): Promise<
  GetStaticPropsResult<
    PackagePagePropsAvailableVersions | PackagePagePropsError
  >
> {
  try {
    const { name } = route;
    const packument = await getPackument({ name });
    const data = getMinimalPackument({ packument });

    return {
      props: {
        kind: PackagePageKind.AvailableVersions,
        data: cleanObject(data),
        createdAt: new Date().toISOString(),
      },
      revalidate: hour,
    };
  } catch {
    return getPackagePageErrorProps({
      message: "Package Not Found",
      revalidate: 10 * minute,
    });
  }
}

function getMinimalPackument({
  packument,
}: {
  packument: Packument;
}): MinimalPackument {
  return pick(packument, [
    "name",
    "gitRepository.url",
    "distTags",
    "versionsToTimestamps",
    "license",
  ]) as MinimalPackument;
}
