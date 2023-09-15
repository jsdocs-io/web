import { validatePackageName } from '$lib/registry/validate-package-name';
import { z } from 'zod';

const endpoint = 'https://registry.npmjs.org/-/v1/search';

const packageSchema = z.object({
	name: z.string(),
	version: z.string(),
	description: z.string().catch(''),
	keywords: z.array(z.string()).catch([])
});

export type Package = z.infer<typeof packageSchema>;

const schema = z.object({
	objects: z.array(
		z.object({
			package: packageSchema
		})
	)
});

export const searchPackages = async (
	fetch: typeof window.fetch,
	query: string
): Promise<Package[]> => {
	if (!query) {
		return [];
	}
	const response = await fetch(`${endpoint}?text=${query}`);
	const data = await response.json();
	return schema
		.parse(data)
		.objects.map((obj) => obj.package)
		.filter((pkg) => validatePackageName(pkg.name));
};
