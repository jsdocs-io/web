import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { PackagePageAvailableVersions } from '../../components/package/PackagePageAvailableVersions';
import { PackagePageDocs } from '../../components/package/PackagePageDocs';
import { getPackagePageStaticProps } from '../../lib/get-package-page-static-props';
import {
    PackagePageKind,
    PackagePageProps,
} from '../../lib/package-page-props';
import { Storage } from '../../lib/storage';
import Page404 from '../404';

const storage = new Storage();

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
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Matched params are always an array for a catch all route.
    // See https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
    const slug = params!.slug as string[];
    const route = `/${slug.join('/')}`;

    return getPackagePageStaticProps({
        route,
        storage,
    });
};
