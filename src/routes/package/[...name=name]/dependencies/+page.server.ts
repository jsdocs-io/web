import { fetchPackageDependencies } from '$lib/registry/fetch-package-dependencies';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { name } = params;
	try {
		const dependencies = await fetchPackageDependencies(fetch, name);
		return { name, dependencies };
	} catch (e) {
		throw error(404, 'Not Found');
	}
}) satisfies PageServerLoad;
