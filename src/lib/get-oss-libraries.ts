import { cleanObject } from './clean-object';

export interface OSSLibrary {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly npm: string;
    readonly license: string;
    readonly licenseText?: string;
}

interface RawOSSLibrary {
    readonly name: string;
    readonly version: string;
    readonly author?: string;
    readonly repository: string | null;
    readonly source: string;
    readonly license: string;
    readonly licenseText: string | null;
}

export async function getOSSLibraries(): Promise<OSSLibrary[]> {
    const rawLibraries = await readOSSLibraries();
    const ossLibraries = rawLibraries.map(
        ({ name, version, license, licenseText }) => {
            return {
                id: `${name}@${version}`,
                name,
                version,
                npm: `https://npmjs.com/${name}`,
                license,
                licenseText: licenseText ?? undefined,
            };
        }
    );

    return cleanObject(ossLibraries);
}

async function readOSSLibraries(): Promise<RawOSSLibrary[]> {
    const { default: ossLibraries } = await import(
        '../../.next/oss-licenses.json'
    );

    return ossLibraries;
}
