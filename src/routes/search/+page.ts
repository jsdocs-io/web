import { searchPackages } from '$lib/registry/search-packages';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const q = url.searchParams.get('q') ?? '';
	const query = q.trim();
	const packages = await searchPackages(query);
	return { query, packages };
}) satisfies PageLoad;
