import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { PackagePageAvailableVersions } from '../../components/package/PackagePageAvailableVersions';
import { PackagePageLoading } from '../../components/package/PackagePageLoading';
import {
    getPackagePageStaticProps,
    PackagePageProps,
} from '../../lib/get-package-page-static-props';
import { PackageRouteKind } from '../../lib/parse-package-route';
import My404 from '../404';

export default function PackagePage(props: PackagePageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <PackagePageLoading />;
    }

    switch (props.kind) {
        case PackageRouteKind.DocLatestVersion:
            return <>TODO:</>;
        case PackageRouteKind.DocFixedVersion:
            return <>TODO:</>;
        case PackageRouteKind.AvailableVersions:
            return <PackagePageAvailableVersions {...props} />;
        case PackageRouteKind.Error:
            return <My404 />;
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params!.slug as string[];
    const slugRoute = slug.join('/');
    const route = `/${slugRoute}`;
    return getPackagePageStaticProps({ route });
};
