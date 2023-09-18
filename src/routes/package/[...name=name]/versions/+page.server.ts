import { fetchPackageVersions } from '$lib/registry/fetch-package-versions';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { name } = params;
	try {
		const versions = await fetchPackageVersions(fetch, name);
		return { versions };
	} catch {
		throw error(404, 'Not Found');
	}
}) satisfies PageServerLoad;
