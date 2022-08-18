import newGitHubIssueURL from "new-github-issue-url";
import React from "react";
import { A } from "../common/A";
import { TimeAgo } from "../common/TimeAgo";

export function PackageFooterSection({
  name,
  version,
  createdAt,
  analysisTime,
}: {
  name?: string;
  version?: string;
  createdAt: string;
  analysisTime?: number;
}) {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const packageIssueURL = newGitHubIssueURL({
    repoUrl: "https://github.com/jsdocs-io/web",
    template: "package-with-missing-or-incorrect-documentation.md",
    title: `Package ${name}@${version} has missing or incorrect documentation`,
  });

  return (
    <section className="space-y-4">
      <hr className="border-gray-300 dark:border-gray-700" />

      <ul className="space-y-2">
        <li>
          Updated <TimeAgo date={createdAt} />.
          {analysisTime && (
            <>
              <br />
              Package analyzed in {analysisTime} ms.
            </>
          )}
        </li>

        {name && version && (
          <li>
            Missing or incorrect documentation?{" "}
            <A href={packageIssueURL}>Open an issue for this package</A>.
          </li>
        )}

        <li>
          <button
            className="text-blue-700 dark:text-blue-300 hover:underline"
            onClick={scrollToTop}
          >
            Back to top
          </button>
        </li>
      </ul>
    </section>
  );
}
