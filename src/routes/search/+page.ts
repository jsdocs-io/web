import { searchPackages } from '$lib/registry/search-packages';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ fetch, url }) => {
	const q = url.searchParams.get('q') ?? '';
	const query = q.trim();
	const packages = await searchPackages(fetch, query);
	return { query, packages };
}) satisfies PageLoad;
