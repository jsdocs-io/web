import prettyBytes from "pretty-bytes";
import { DistTags } from "query-registry";
import isValidLicense from "../../lib/is-valid-license";
import TimeAgo from "../common/TimeAgo";

const PackageInfoSummaryList = ({
  version,
  publishedAt,
  license,
  unpackedSize,
  dependencies,
  distTags,
  versionsToTimestamps,
}: {
  version?: string;
  publishedAt?: string;
  license?: string;
  unpackedSize?: number;
  dependencies?: Record<string, string>;
  distTags?: DistTags;
  versionsToTimestamps?: Record<string, string>;
}) => {
  const describeDeps = () => {
    const numDeps = Object.keys(dependencies!).length;
    switch (numDeps) {
      case 0:
        return "No dependencies";
      case 1:
        return "1 dependency";
      default:
        return `${numDeps} dependencies`;
    }
  };

  const describeUnpackedSize = () => {
    return prettyBytes(unpackedSize!);
  };

  const describeDistTags = () => {
    const numDistTags = Object.keys(distTags!).length;
    return `${numDistTags} tag${numDistTags > 1 ? "s" : ""}`;
  };

  const describeVersions = () => {
    const numVersions = Object.keys(versionsToTimestamps!).length;
    return `${numVersions} version${numVersions > 1 ? "s" : ""}`;
  };

  const describeLatestVersion = () => {
    const latestVersion = distTags!.latest;
    const latestVersionPublishedAt = versionsToTimestamps![latestVersion]!;

    return (
      <>
        Version <span className="font-bold">{latestVersion}</span> published{" "}
        <TimeAgo date={latestVersionPublishedAt} />
      </>
    );
  };

  return (
    <ul className="text-lg sm:list-inline">
      {/* Docs page info */}
      {version && (
        <li>
          <svg
            className="inline-block w-5 h-5 mb-1 align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>{" "}
          Version <span className="font-bold">{version}</span>
        </li>
      )}

      {publishedAt && (
        <li>
          <svg
            className="inline-block w-5 h-5 mb-1 align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>{" "}
          Published <TimeAgo date={publishedAt} />
        </li>
      )}

      {unpackedSize && (
        <li>
          <svg
            className="inline-block w-5 h-5 mb-1 align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>{" "}
          {describeUnpackedSize()}
        </li>
      )}

      {dependencies && (
        <li>
          <svg
            className="inline-block w-5 h-5 mb-1 align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>{" "}
          {describeDeps()}
        </li>
      )}

      {/* Available versions page info */}
      {distTags && versionsToTimestamps && (
        <li>
          <svg
            className="inline-block w-5 h-5 mb-1 align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>{" "}
          {describeLatestVersion()}
        </li>
      )}

      {distTags && (
        <li>
          <svg
            className="inline-block w-5 h-5 mb-1 align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>{" "}
          {describeDistTags()}
        </li>
      )}

      {versionsToTimestamps && (
        <li>
          <svg
            className="inline-block w-5 h-5 mb-1 align-middle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>{" "}
          {describeVersions()}
        </li>
      )}

      {/* Common info */}
      <li>
        <svg
          className="inline-block w-5 h-5 mb-1 align-middle"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>{" "}
        {isValidLicense({ license }) ? license : "Custom"} license
      </li>
    </ul>
  );
};

export default PackageInfoSummaryList;
