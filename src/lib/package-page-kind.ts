export enum PackagePageKind {
  /** Documentation page for a specific package version */
  Docs = "Docs",

  /** Package versions and dist tags */
  AvailableVersions = "AvailableVersions",

  /** Error page (invalid route, package not found, version not found) */
  Error = "Error",
}
