import { DistTags } from "query-registry";
import PackageLink from "../common/PackageLink";

const PackageDistTagsSection = ({
  name,
  distTags,
}: {
  name: string;
  distTags: DistTags;
}) => {
  return (
    <section className="space-y-6">
      <h2 id="package-dist-tags">Tags ({Object.keys(distTags).length})</h2>

      <ul className="max-w-3xl space-y-6">
        {Object.entries(distTags).map(([tag, version]) => (
          <li
            key={tag}
            className="flex flex-wrap justify-between pb-1 border-b border-gray-300 dark:border-gray-700"
          >
            <PackageLink
              name={name}
              version={version}
              title={`${name}@${version}`}
            >
              {version}
            </PackageLink>

            <span>{tag}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PackageDistTagsSection;
