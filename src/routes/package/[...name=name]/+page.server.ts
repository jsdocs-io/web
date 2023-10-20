import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		analyzedAt: new Date().toISOString(),
		analysisDuration: 1234
	};
}) satisfies PageServerLoad;
