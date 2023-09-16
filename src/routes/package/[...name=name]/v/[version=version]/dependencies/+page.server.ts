import { fetchPackageWithDependencies } from '$lib/registry/fetch-package-with-dependencies';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { name, version } = params;
	try {
		const pkg = await fetchPackageWithDependencies(fetch, name, version);
		return pkg;
	} catch (e) {
		throw error(404, 'Not Found');
	}
}) satisfies PageServerLoad;
