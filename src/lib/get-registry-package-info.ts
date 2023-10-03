import { RegistryPackageInfo } from "@jsdocs-io/extractor";
import { loadRegistryPackageInfo } from "./registry-package-info-storage";

const getRegistryPackageInfo = async ({
  name,
  version,
}: {
  name: string;
  version: string;
}): Promise<RegistryPackageInfo> => {
  const cachedInfo = await loadRegistryPackageInfo({ name, version });
  if (cachedInfo) {
    return cachedInfo;
  }

  throw new Error(
    "FIXME: API extraction for new packages is temporarily disabled"
  );

  // const info = await analyzeRegistryPackage({ name, version });

  // await storeRegistryPackageInfo({ name, version, info });

  // return info;
};

export default getRegistryPackageInfo;
