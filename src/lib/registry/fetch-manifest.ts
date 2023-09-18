import { fetchPackument } from '$lib/registry/fetch-packument';
import type { Manifest } from '$lib/registry/manifest';

export const fetchManifest = async (
	fetch: typeof window.fetch,
	name: string,
	version = 'latest'
): Promise<Manifest> => {
	const packument = await fetchPackument(fetch, name);
	const semver = packument['dist-tags'][version] ?? version;
	const manifest = packument.versions[semver];
	if (!manifest) {
		throw new Error(`fetchManifest: manifest not found for ${name}@${semver}`);
	}
	return manifest;
};
