import { GetStaticPropsResult } from "next";
import { PackagePageKind } from "./package-page-kind";
import { week } from "./revalidate-times";

export interface PackagePagePropsError {
  readonly kind: PackagePageKind.Error;
  readonly message?: string;
}

const getPackagePageErrorProps = ({
  message = "Page Not Found",
  revalidate = week,
}: {
  message?: string;
  revalidate?: number | boolean;
} = {}): GetStaticPropsResult<PackagePagePropsError> => {
  return {
    props: {
      kind: PackagePageKind.Error,
      message,
    },
    revalidate,
  };
};

export default getPackagePageErrorProps;
