import { SearchResult } from "query-registry";
import React from "react";
import { TimeAgo } from "../../components/common/TimeAgo";
import { A } from "../common/A";
import { PackageLink } from "../common/PackageLink";

export default function SearchResults({
  searchResults,
}: {
  searchResults?: SearchResult[];
}) {
  if (!searchResults) {
    return (
      <p className="mt-0 text-2xl font-bold text-center animate-pulse">
        Loading...
      </p>
    );
  }

  const packages = searchResults.map(({ package: pkg }) => {
    return {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      date: pkg.date as string | undefined,
      publisherName: pkg.publisher?.username as string | undefined,
    };
  });
  if (!packages.length) {
    return (
      <p className="mt-0 text-2xl font-bold text-center">No search results</p>
    );
  }

  return (
    <div className="space-y-12">
      {packages.map(({ name, version, description, date, publisherName }) => (
        <div key={name}>
          <PackageLink
            name={name}
            version={version}
            title={`${name}@${version}`}
          >
            <span className="text-xl font-bold break-words hover:underline">
              {name}
            </span>
          </PackageLink>

          {description && <p className="break-words">{description}</p>}

          <p>
            Version <span className="font-bold">{version}</span>
            {date && (
              <>
                {" "}
                published <TimeAgo date={date} />
              </>
            )}
            {publisherName && (
              <>
                {" "}
                by{" "}
                <A
                  href={`https://www.npmjs.com/~${publisherName}`}
                  title={`${publisherName}'s npm profile page`}
                >
                  {publisherName}
                </A>
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
