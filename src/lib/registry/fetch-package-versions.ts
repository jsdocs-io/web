import { z } from 'zod';

const endpoint = 'https://registry.npmjs.org';

const packageVersionsSchema = z
	.object({
		'dist-tags': z.record(z.string()),
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
			history: history as Record<string, string>
		};
	});

export type PackageVersions = z.infer<typeof packageVersionsSchema>;

export const fetchPackageVersions = async (
	fetch: typeof window.fetch,
	name: string
): Promise<PackageVersions> => {
	const response = await fetch(`${endpoint}/${name}`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.json();
	return packageVersionsSchema.parse(data);
};
