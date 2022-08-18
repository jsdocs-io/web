import React from "react";
import { isValidLicense } from "../../lib/is-valid-license";
import { PackageExternalTypesAlert } from "./PackageExternalTypesAlert";
import { PackageLicenseAlert } from "./PackageLicenseAlert";
import { PackageMissingTypesAlert } from "./PackageMissingTypesAlert";

export function PackageAlerts({
  hasDocs,
  definitelyTypedName,
  license,
}: {
  hasDocs: boolean;
  definitelyTypedName?: string;
  license?: string;
}) {
  if (hasDocs) {
    return null;
  }

  if (definitelyTypedName) {
    return (
      <PackageExternalTypesAlert definitelyTypedName={definitelyTypedName} />
    );
  }

  if (!isValidLicense({ license })) {
    return <PackageLicenseAlert />;
  }

  return <PackageMissingTypesAlert />;
}
