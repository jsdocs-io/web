import { RegistryPackageInfo } from "@jsdocs-io/extractor";
import pkgJSON from "@jsdocs-io/extractor/package.json";
import { loadObject, storeObject } from "./storage";

const { version: packageAnalyzerVersion } = pkgJSON;

export async function loadRegistryPackageInfo({
  name,
  version,
}: {
  name: string;
  version: string;
}): Promise<RegistryPackageInfo | undefined> {
  return loadObject({
    name: getObjectName({ name, version }),
  });
}

export async function storeRegistryPackageInfo({
  name,
  version,
  info,
}: {
  name: string;
  version: string;
  info: RegistryPackageInfo;
}): Promise<void> {
  return storeObject({
    name: getObjectName({ name, version }),
    obj: info,
  });
}

function getObjectName({
  name,
  version,
}: {
  name: string;
  version: string;
}): string {
  return `registry-package-info/${packageAnalyzerVersion}/${name}/${version}.json`;
}
