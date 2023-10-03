import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { name, version } = params;
	console.log({ name, version });

	// try {
	// 	const versions = await fetchPackageVersions(fetch, name);
	// 	return { versions };
	// } catch {
	// 	throw error(404, 'Not Found');
	// }
	// return { name: 'foo' };
}) satisfies LayoutServerLoad;
