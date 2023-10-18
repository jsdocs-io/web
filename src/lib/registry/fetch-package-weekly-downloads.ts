import { REGISTRY_CACHE_TTL, REGISTRY_DOWNLOADS_API_URL } from '$env/static/private';
import { isValidPackageName } from '$lib/registry/is-valid-package-name';
import {
	packageDownloadsTotalSchema,
	type PackageDownloadsTotal
} from '$lib/registry/package-downloads-total';
import Keyv from 'keyv';
import urlJoin from 'url-join';

const registryDownloadsApiUrl = REGISTRY_DOWNLOADS_API_URL;

const cache = new Keyv({ namespace: 'package_downloads_total' });
const ttl = parseInt(REGISTRY_CACHE_TTL, 10);

export const fetchPackageWeeklyDownloads = async (
	fetch: typeof window.fetch,
	name: string
): Promise<PackageDownloadsTotal> => {
	if (!isValidPackageName(name)) {
		throw new Error(`fetchPackageWeeklyDownloads: invalid package name: ${name}`);
	}
	const cachedPackageDownloadsTotal = await cache.get(name);
	if (cachedPackageDownloadsTotal) {
		return cachedPackageDownloadsTotal;
	}
	const response = await fetch(urlJoin(registryDownloadsApiUrl, 'last-week', name));
	if (!response.ok) {
		throw new Error(
			`fetchPackageWeeklyDownloads: cannot fetch downloads for package ${name}: ${response.statusText}`
		);
	}
	const data = await response.json();
	const packageDownloadsTotal = packageDownloadsTotalSchema.parse(data);
	await cache.set(name, packageDownloadsTotal, ttl);
	return packageDownloadsTotal;
};
