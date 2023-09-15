import { fetchPackageDependencies } from '$lib/registry/fetch-package-dependencies';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { name, version } = params;
	try {
		const dependencies = await fetchPackageDependencies(fetch, name, version);
		return { name, version, dependencies };
	} catch (e) {
		throw error(404, 'Not Found');
	}
}) satisfies PageServerLoad;
