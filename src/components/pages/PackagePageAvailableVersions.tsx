import NextHead from "next/head";
import React from "react";
import { PackagePagePropsAvailableVersions } from "../../lib/get-package-page-available-versions-props";
import { Layout } from "../common/Layout";
import { PackageDistTagsSection } from "../package/PackageDistTagsSection";
import { PackageFooterSection } from "../package/PackageFooterSection";
import { PackageNav } from "../package/PackageNav";
import { PackageTitleSection } from "../package/PackageTitleSection";
import { PackageVersionsSection } from "../package/PackageVersionsSection";

export function PackagePageAvailableVersions({
  data,
  createdAt,
}: PackagePagePropsAvailableVersions) {
  const { name, gitRepository, distTags, versionsToTimestamps, license } = data;

  const pageTitle = `${name} versions - jsDocs.io`;
  const pageDescription = `Available versions for npm package ${name} - jsDocs.io`;
  const pageURL = `https://www.jsdocs.io/package/${name}/versions`;

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageURL} />

        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
      </NextHead>

      <Layout>
        <div className="space-y-12">
          <PackageNav name={name} repositoryURL={gitRepository?.url} />

          <PackageTitleSection
            name={name}
            distTags={distTags}
            versionsToTimestamps={versionsToTimestamps}
            license={license}
          />

          <PackageDistTagsSection name={name} distTags={distTags} />

          <PackageVersionsSection
            name={name}
            versionsToTimestamps={versionsToTimestamps}
          />

          <PackageFooterSection createdAt={createdAt} />
        </div>
      </Layout>
    </>
  );
}
