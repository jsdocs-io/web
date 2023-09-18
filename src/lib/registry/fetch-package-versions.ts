import { fetchPackument } from '$lib/registry/fetch-packument';
import { packumentSchema } from '$lib/registry/packument';
import type { z } from 'zod';

const packageVersionsSchema = packumentSchema
	.pick({
		'dist-tags': true,
		time: true
	})
	.transform((obj) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { created, modified, ...history } = obj.time;
		return {
			tags: obj['dist-tags'],
			history: history
		};
	});

export type PackageVersions = z.infer<typeof packageVersionsSchema>;

export const fetchPackageVersions = async (
	fetch: typeof window.fetch,
	name: string
): Promise<PackageVersions> => {
	const packument = await fetchPackument(fetch, name);
	return packageVersionsSchema.parse(packument);
};
