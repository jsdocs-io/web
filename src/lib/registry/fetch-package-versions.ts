import { REGISTRY_API_URL } from '$env/static/private';
import { fetchWithCache } from '$lib/registry/fetch-with-cache';
import { z } from 'zod';

const endpoint = REGISTRY_API_URL;

const packageVersionsSchema = z
	.object({
		'dist-tags': z
			.object({
				latest: z.string()
			})
			.catchall(z.string()),
		time: z
			.object({
				created: z.string(),
				modified: z.string()
			})
			.catchall(z.string())
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
	const data = await fetchWithCache(fetch, `${endpoint}/${name}`);
	return packageVersionsSchema.parse(data);
};
