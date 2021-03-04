import { writeFileSync } from 'fs-extra';
import * as path from 'path';
import * as prettier from 'prettier';

main();

function main(): void {
    const packages = getPrerenderedPackages();
    console.log(`Packages to prerender: ${packages.length}`);

    writePrerenderedPackagesFile({ packages });
}

function getPrerenderedPackages(): string[] {
    return Array.from(
        new Set([
            ...getShowcasedPackages(),
            ...getPackagesLinkingToJsDocs(),
            ...getHeavyPackages(),
        ])
    ).sort();
}

function getShowcasedPackages(): string[] {
    return ['@types/react', 'faastjs', 'query-registry', 'short-time-ago'];
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
        'typescript',
    ];
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
