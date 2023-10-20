import { fetchManifest } from '$lib/registry/fetch-manifest';
import { fetchPackageWeeklyDownloads } from '$lib/registry/fetch-package-weekly-downloads';
import { fetchPackument } from '$lib/registry/fetch-packument';
import type { Manifest } from '$lib/registry/manifest';
import type { PackageDownloadsTotal } from '$lib/registry/package-downloads-total';
import type { Packument } from '$lib/registry/packument';
import { searchPackages, type PackageResult } from '$lib/registry/search-packages';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { name } = params;

	let packument: Packument;
	let manifest: Manifest;
	try {
		packument = await fetchPackument(fetch, name);
		manifest = await fetchManifest(fetch, name);
	} catch (err) {
		console.error(`package layout load: no packument for ${name}: ${err}`);
		throw error(404, { message: 'Package not found' });
	}

	let packageResult: PackageResult | undefined;
	try {
		const foundPackages = await searchPackages(fetch, manifest.name, 1);
		packageResult = foundPackages.find((pkg) => pkg.name === manifest.name);
	} catch (err) {
		console.error(`package layout load: no search results for ${name}: ${err}`);
	}

	let packageDownloads: PackageDownloadsTotal | undefined;
	try {
		packageDownloads = await fetchPackageWeeklyDownloads(fetch, manifest.name);
	} catch (err) {
		console.error(`package layout load: no downloads for ${name}: ${err}`);
	}

	return {
		name: manifest.name,
		version: manifest.version,
		repository: packageResult?.links.repository,
		homepage: packageResult?.links.homepage,
		publishedAt: packument.time[manifest.version]!,
		license: manifest.license,
		dependencies: manifest.dependencies,
		weeklyDownloads: packageDownloads?.downloads,
		unpackedSize: manifest.dist.unpackedSize,
		updatedAt: new Date().toISOString()
	};
}) satisfies LayoutServerLoad;
