import { DistTags } from "query-registry";
import PackageInfoSummaryList from "./PackageInfoSummaryList";

const PackageTitleSection = ({
  name,
  version,
  publishedAt,
  license,
  unpackedSize,
  dependencies,
  distTags,
  versionsToTimestamps,
}: {
  name: string;
  version?: string;
  publishedAt?: string;
  license?: string;
  unpackedSize?: number;
  dependencies?: Record<string, string>;
  distTags?: DistTags;
  versionsToTimestamps?: Record<string, string>;
}) => {
  return (
    <section className="space-y-1">
      <h1 className="break-words">{name}</h1>

      <PackageInfoSummaryList
        version={version}
        publishedAt={publishedAt}
        license={license}
        unpackedSize={unpackedSize}
        dependencies={dependencies}
        distTags={distTags}
        versionsToTimestamps={versionsToTimestamps}
      />
    </section>
  );
};

export default PackageTitleSection;
