import { PackageAPI, RegistryPackageInfo } from "@jsdocs-io/extractor";
import cleanDeep from "clean-deep";
import { pick } from "filter-anything";
import { GetStaticPropsResult } from "next";
import {
  PackageManifest,
  getPackageManifest,
  getPackument,
} from "query-registry";
import cleanObject from "./clean-object";
import flattenPackageAPI from "./flatten-package-api";
import { PackagePagePropsError } from "./get-package-page-error-props";
import getRegistryPackageInfo from "./get-registry-package-info";
import { PackagePageKind } from "./package-page-kind";
import {
  PackageRouteDocFixedVersion,
  PackageRouteDocLatestVersion,
  PackageRouteKind,
} from "./parse-package-route";
import { day, hour } from "./revalidate-times";

export interface PackagePagePropsDocs {
  readonly kind: PackagePageKind.Docs;
  readonly data: MinimalRegistryPackageInfo;
  readonly createdAt: string;
}

export interface MinimalRegistryPackageInfo {
  readonly manifest: MinimalPackageManifest;
  readonly api?: PackageAPI;
  readonly elapsed: number;
}

export type MinimalPackageManifest = Pick<
  PackageManifest,
  | "id"
  | "name"
  | "version"
  | "description"
  | "definitelyTypedName"
  | "untypedName"
  | "gitRepository"
  | "license"
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "dist"
  | "createdAt"
>;

const getMinimalPackageAPI = ({
  fullAPI,
}: {
  fullAPI?: PackageAPI;
}): PackageAPI | undefined => {
  if (!fullAPI) {
    return undefined;
  }

  // Not anymore a proper `PackageAPI` with respect to `Declaration` kinds!
  // For example, a `VariableDeclaration` won't have the `variableKind` property.
  return cleanDeep(fullAPI, {
    cleanKeys: [
      // VariableDeclaration, FunctionDeclaration,
      // ClassPropertyDeclaration, ClassMethodDeclaration,
      // InterfacePropertyDeclaration, InterfaceMethodDeclaration
      "type",
      // VariableDeclaration
      "variableKind",
      // ClassDeclaration
      "isAbstract",
      // ClassPropertyDeclaration, ClassMethodDeclaration
      "isStatic",
      // InterfacePropertyDeclaration
      "isReadonly",
      // InterfacePropertyDeclaration
      "isOptional",
      // EnumDeclaration
      "isConst",
      // EnumMemberDeclaration
      "value",
      // DeclarationSource, PackageFile
      "url",
    ],
    emptyArrays: false,
    emptyObjects: false,
    emptyStrings: false,
  }) as PackageAPI;
};

const getMinimalPackageManifest = ({
  fullManifest,
}: {
  fullManifest: PackageManifest;
}): MinimalPackageManifest => {
  return pick(fullManifest, [
    "id",
    "name",
    "version",
    "description",
    "definitelyTypedName",
    "untypedName",
    "gitRepository.url",
    "license",
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "dist.unpackedSize",
    "createdAt",
  ]) as unknown as MinimalPackageManifest;
};

const getMinimalRegistryPackageInfo = ({
  info,
}: {
  info: RegistryPackageInfo;
}): MinimalRegistryPackageInfo => {
  const { manifest: fullManifest, api: fullAPI, elapsed } = info;
  const manifest = getMinimalPackageManifest({ fullManifest });
  const minimalAPI = getMinimalPackageAPI({ fullAPI });
  const api = flattenPackageAPI({ api: minimalAPI });

  return { manifest, api, elapsed };
};

const getPackagePageDocsProps = async ({
  route,
}: {
  route: PackageRouteDocLatestVersion | PackageRouteDocFixedVersion;
}): Promise<
  GetStaticPropsResult<PackagePagePropsDocs | PackagePagePropsError>
> => {
  try {
    // Establish the semver version number to analyze
    const { name, version: rawVersion } = { version: "latest", ...route };
    const { distTags } = await getPackument({ name });
    const version = distTags[rawVersion] ?? rawVersion;

    // If API extraction fails return basic info
    let info: RegistryPackageInfo;
    try {
      info = await getRegistryPackageInfo({ name, version });
    } catch {
      const manifest = await getPackageManifest({ name, version });
      info = {
        id: manifest.id,
        manifest,
        createdAt: new Date().toISOString(),
        elapsed: 1,
      };
    }

    const data = getMinimalRegistryPackageInfo({ info });

    return {
      props: {
        kind: PackagePageKind.Docs,
        data: cleanObject(data),
        createdAt: info.createdAt,
      },
      revalidate:
        route.kind === PackageRouteKind.DocLatestVersion ? day : undefined,
    };
  } catch {
    return {
      notFound: true,
      revalidate: hour,
    };
  }
};

export default getPackagePageDocsProps;
