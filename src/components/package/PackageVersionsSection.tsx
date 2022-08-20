import PackageLink from "../common/PackageLink";
import TimeAgo from "../common/TimeAgo";

const PackageVersionsSection = ({
  name,
  versionsToTimestamps,
}: {
  name: string;
  versionsToTimestamps: Record<string, string>;
}) => {
  return (
    <section className="space-y-6">
      <h2 id="package-versions">
        Versions ({Object.keys(versionsToTimestamps).length})
      </h2>

      <ul className="max-w-3xl space-y-6">
        {Object.entries(versionsToTimestamps)
          .reverse()
          .map(([version, publishedAt]) => (
            <li
              key={version}
              className="flex flex-wrap justify-between pb-1 border-b border-gray-300 dark:border-gray-700"
            >
              <PackageLink
                name={name}
                version={version}
                title={`${name}@${version}`}
              >
                {version}
              </PackageLink>

              <TimeAgo date={publishedAt} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default PackageVersionsSection;
