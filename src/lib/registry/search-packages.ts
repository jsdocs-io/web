import { PUBLIC_REGISTRY_SEARCH_API_URL } from '$env/static/public';
import { isValidPackageName } from '$lib/registry/is-valid-package-name';

import { z } from 'zod';

const endpoint = PUBLIC_REGISTRY_SEARCH_API_URL;

const packageResultSchema = z.object({
	name: z.string(),
	version: z.string(),
	description: z.string().catch(''),
	keywords: z.array(z.string()).catch([])
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
	query: string
): Promise<PackageResult[]> => {
	if (!query) {
		return [];
	}
	const response = await fetch(`${endpoint}?text=${query}`);
	const data = await response.json();
	return schema
		.parse(data)
		.objects.map((obj) => obj.package)
		.filter((pkg) => isValidPackageName(pkg.name));
};
