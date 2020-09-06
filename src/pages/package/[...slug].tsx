import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { PackagePageAvailableVersions } from '../../components/package/PackagePageAvailableVersions';
import { PackagePageDocs } from '../../components/package/PackagePageDocs';
import { PackagePageLoading } from '../../components/package/PackagePageLoading';
import { getPackagePageStaticProps } from '../../lib/get-package-page-static-props';
import {
    PackagePageKind,
    PackagePageProps,
} from '../../lib/package-page-props';
import Page404 from '../404';

export default function PackagePage(props: PackagePageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <PackagePageLoading />;
    }

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
