import semverMinVersion from "semver/ranges/min-version";

const minSemverVersion = ({
  semver,
}: {
  semver: string;
}): string | undefined => {
  let version;
  try {
    version = semverMinVersion(semver)?.version;
  } catch {}
  return version !== "0.0.0" ? version : undefined;
};

export default minSemverVersion;
