import { PUBLIC_REGISTRY_SEARCH_API_URL } from '$env/static/public';
import { isValidPackageName } from '$lib/registry/is-valid-package-name';

import { z } from 'zod';

const endpoint = PUBLIC_REGISTRY_SEARCH_API_URL;

const packageResultSchema = z.object({
	name: z.string(),
	version: z.string(),
	description: z.string().catch(''),
	keywords: z.array(z.string()).catch([]),
	links: z.object({
		npm: z.string().optional(),
		homepage: z.string().optional(),
		repository: z.string().optional()
	})
});

export type PackageResult = z.infer<typeof packageResultSchema>;

const schema = z.object({
	objects: z.array(
		z.object({
			package: packageResultSchema
		})
	)
});

export const searchPackages = async (
	fetch: typeof window.fetch,
	query: string,
	size = 20
): Promise<PackageResult[]> => {
	if (!query) {
		return [];
	}
	const response = await fetch(`${endpoint}?text=${query}&size=${size}`);
	const data = await response.json();
	return schema
		.parse(data)
		.objects.map((obj) => obj.package)
		.filter((pkg) => isValidPackageName(pkg.name));
};
