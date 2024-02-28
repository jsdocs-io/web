import { RegistryPackageInfo } from "@jsdocs-io/extractor";
import pkgJSON from "@jsdocs-io/extractor/package.json";
import { loadObject, storeObject } from "./storage";

const { version: packageAnalyzerVersion } = pkgJSON;

const getObjectName = ({
  name,
  version,
}: {
  name: string;
  version: string;
}): string => {
  return `registry-package-info/${packageAnalyzerVersion}/${name}/${version}.json`;
};

export const loadRegistryPackageInfo = async ({
  name,
  version,
}: {
  name: string;
  version: string;
}): Promise<RegistryPackageInfo | undefined> => {
  return loadObject({
    name: getObjectName({ name, version }),
  });
};

export const storeRegistryPackageInfo = async ({
  name,
  version,
  info,
}: {
  name: string;
  version: string;
  info: RegistryPackageInfo;
}): Promise<void> => {
  return storeObject({
    name: getObjectName({ name, version }),
    obj: info,
  });
};
