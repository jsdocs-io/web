import { REGISTRY_API_URL, REGISTRY_CACHE_TTL } from '$env/static/private';
import { isValidPackageName } from '$lib/registry/is-valid-package-name';
import { packumentSchema, type Packument } from '$lib/registry/packument';
import Keyv from 'keyv';
import urlJoin from 'url-join';

const registryApiUrl = REGISTRY_API_URL;

const cache = new Keyv({ namespace: 'packuments' });
const ttl = parseInt(REGISTRY_CACHE_TTL, 10);

export const fetchPackument = async (
	fetch: typeof window.fetch,
	name: string
): Promise<Packument> => {
	if (!isValidPackageName(name)) {
		throw new Error(`fetchPackument: invalid package name: ${name}`);
	}
	const cachedPackument = await cache.get(name);
	if (cachedPackument) {
		return cachedPackument;
	}
	const response = await fetch(urlJoin(registryApiUrl, name));
	if (!response.ok) {
		throw new Error(`fetchPackument: cannot fetch package ${name}: ${response.statusText}`);
	}
	const data = await response.json();
	const packument = packumentSchema.parse(data);
	await cache.set(name, packument, ttl);
	return packument;
};
