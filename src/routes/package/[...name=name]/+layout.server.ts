import { fetchPackageInfo } from '$lib/registry/fetch-package-info';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { name } = params;
	const packageInfo = await fetchPackageInfo(fetch, name);
	return { packageInfo };
}) satisfies LayoutServerLoad;
