import { REGISTRY_CACHE_TTL } from '$env/static/private';
import Keyv from 'keyv';

const cache = new Keyv();
const ttl = parseInt(REGISTRY_CACHE_TTL, 10);

export const fetchWithCache = async (fetch: typeof window.fetch, url: string): Promise<unknown> => {
	const cachedData = await cache.get(url);
	if (cachedData !== undefined) {
		return cachedData;
	}
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.json();
	await cache.set(url, data, ttl);
	return data;
};
