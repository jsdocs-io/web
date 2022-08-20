import { PackageAPI } from "@jsdocs-io/extractor";

const hasPackageDeclarations = ({ api }: { api?: PackageAPI }): boolean => {
  return Object.values(api?.declarations ?? {}).flat().length > 0;
};

export default hasPackageDeclarations;
