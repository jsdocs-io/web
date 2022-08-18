import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { prerenderPackages } from "../../../config";
import { PackagePageAvailableVersions } from "../../components/pages/PackagePageAvailableVersions";
import { PackagePageDocs } from "../../components/pages/PackagePageDocs";
import { prerenderedPackages } from "../../data/prerendered-packages";
import {
  getPackagePageStaticProps,
  PackagePageProps,
} from "../../lib/get-package-page-static-props";
import { PackagePageKind } from "../../lib/package-page-kind";
import Page404 from "../404";

export default function PackagePage(props: PackagePageProps) {
  switch (props.kind) {
    case PackagePageKind.Docs:
      return <PackagePageDocs {...props} />;
    case PackagePageKind.AvailableVersions:
      return <PackagePageAvailableVersions {...props} />;
    case PackagePageKind.Error:
      return <Page404 message={props.message} />;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: prerenderPackages
      ? prerenderedPackages.map((name) => `/package/${name}`)
      : [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Matched params are always an array for a catch all route.
  // See https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
  const slug = params!.slug as string[];
  const route = `/${slug.join("/")}`;

  return getPackagePageStaticProps({ route });
};
