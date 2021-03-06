import { writeFileSync } from 'fs-extra';
import got from 'got';
import * as path from 'path';
import * as prettier from 'prettier';
import {
    getPackageManifest,
    npmRegistry,
    npmRegistryMirrors,
} from 'query-registry';
const urlJoin = require('proper-url-join');

main().then(() => {
    console.log('Done');
});

async function main(): Promise<void> {
    const packages = await getPrerenderedPackages();
    console.log(`Packages to prerender: ${packages.length}`);

    writePrerenderedPackagesFile({ packages });
}

async function getPrerenderedPackages(): Promise<string[]> {
    return Array.from(
        new Set([
            ...getShowcasedPackages(),
            ...getPackagesLinkingToJsDocs(),
            ...getHeavyPackages(),
            ...(await getPopularNpmPackagesWithDefinitelyTyped({
                minPackages: 1000,
            })),
            ...(await getPopularNpmPackages({
                minPackages: 1000,
                language: 'typescript',
            })),
        ])
    ).sort();
}

function getShowcasedPackages(): string[] {
    return [
        '@types/react',
        'faastjs',
        'query-registry',
        'short-time-ago',
        'vue',
    ];
}

function getPackagesLinkingToJsDocs(): string[] {
    return ['enttec-open-dmx-usb'];
}

function getHeavyPackages(): string[] {
    return [
        '@babel/types',
        '@jest/types',
        '@types/aws-lambda',
        '@types/lodash',
        '@types/underscore',
        'csstype',
        'firebase',
        'fp-ts',
        'phaser',
        'ts-morph',
        'typescript',
    ];
}

async function getPopularNpmPackagesWithDefinitelyTyped({
    minPackages,
    language,
}: {
    minPackages: number;
    language?: string;
}): Promise<string[]> {
    const popularPackages = await getPopularNpmPackages({
        minPackages,
        language,
    });

    const definitelyTypedPackages: string[] = [];
    for (const name of popularPackages) {
        console.log(`Checking for DT package for: ${name}`);
        const { definitelyTypedName } = await getPackageManifest({
            name,
            registry: 'http://localhost:4873',
            mirrors: [npmRegistry, ...npmRegistryMirrors],
        });
        if (definitelyTypedName) {
            console.log(`Found DT package: ${definitelyTypedName}`);
            definitelyTypedPackages.push(definitelyTypedName);
        }

        await sleep(500);
    }

    return [...popularPackages, ...definitelyTypedPackages];
}

async function getPopularNpmPackages({
    minPackages,
    language,
}: {
    minPackages: number;
    language?: string;
}): Promise<string[]> {
    const packagesPerPage = 100;
    const numPages = Math.ceil(minPackages / packagesPerPage);
    const pages = Array.from(Array(numPages).keys());

    const popularPackages: string[] = [];
    for (const page of pages) {
        const url = getLibrariesIOEndpoint({ page, packagesPerPage, language });
        const data = (await got(url).json()) as { name: string }[];
        const names = data.map(({ name }) => name);
        console.log(`Got popular packages page: ${page}`);

        popularPackages.push(...names);
        await sleep(1000);
    }

    return popularPackages;
}

function getLibrariesIOEndpoint({
    page,
    packagesPerPage,
    language,
}: {
    page: number;
    packagesPerPage: number;
    language?: string;
}): string {
    // See https://libraries.io/search?order=desc&page=1&platforms=npm&sort=dependent_repos_count
    return urlJoin('https://libraries.io/api/search', {
        query: {
            api_key: process.env.LIBRARIES_IO_API_KEY,

            // Pages start from 1
            page: page + 1,
            per_page: packagesPerPage,

            // "Most used" sort criteria
            sort: 'dependent_repos_count',
            order: 'desc',
            platforms: 'npm',

            // Optional language filter
            languages: language,
        },
    });
}

function writePrerenderedPackagesFile({
    packages,
}: {
    packages: string[];
}): void {
    const prerenderedPackagesFilepath = path.join(
        __dirname,
        '../src/data/prerendered-packages.ts'
    );

    const data = format({
        text: `export const prerenderedPackages = ${JSON.stringify(packages)};`,
    });

    writeFileSync(prerenderedPackagesFilepath, data);
}

function format({ text }: { text: string }): string {
    return prettier.format(text, {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 4,
        printWidth: 80,
        endOfLine: 'lf',
        arrowParens: 'always',
        parser: 'typescript',
    });
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
