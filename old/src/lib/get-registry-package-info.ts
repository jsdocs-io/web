import {
  RegistryPackageInfo,
  analyzeRegistryPackage,
} from "@jsdocs-io/extractor";
import {
  loadRegistryPackageInfo,
  storeRegistryPackageInfo,
} from "./registry-package-info-storage";

// const allowedPackages = new Set([
//   "@jsdocs-io/extractor",
//   "@types/react",
//   "@unocss/core",
//   "@violentmonkey/shortcut",
//   "axios",
//   "bundle-require",
//   "class-transformer",
//   "class-validator",
//   "depextract",
//   "enttec-open-dmx-usb",
//   "exome",
//   "faastjs",
//   "got",
//   "h3",
//   "hn-ts",
//   "iron-webcrypto",
//   "next",
//   "prettier",
//   "query-registry",
//   "react-router-dom",
//   "short-time-ago",
//   "string-ts",
//   "talkify-tts-api",
//   "tinyargs",
//   "verify-hcaptcha",
//   "vite",
//   "vue",
//   "yup",
//   "zod",
// ]);

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

  // if (allowedPackages.has(name)) {
  const info = await analyzeRegistryPackage({ name, version });
  await storeRegistryPackageInfo({ name, version, info });
  return info;
  // }

  // throw new Error("FIXME: API extraction for packages is temporarily disabled");
};

export default getRegistryPackageInfo;
