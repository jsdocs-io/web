import { REGISTRY_API_URL } from '$env/static/private';
import { z } from 'zod';

const endpoint = REGISTRY_API_URL;

const packageWithDependenciesSchema = z.object({
	name: z.string(),
	version: z.string(),
	dependencies: z.record(z.string()).catch({}),
	devDependencies: z.record(z.string()).catch({}),
	peerDependencies: z.record(z.string()).catch({})
});

export type PackageWithDependencies = z.infer<typeof packageWithDependenciesSchema>;

export const fetchPackageWithDependencies = async (
	fetch: typeof window.fetch,
	name: string,
	version = 'latest'
): Promise<PackageWithDependencies> => {
	const response = await fetch(`${endpoint}/${name}/${version}`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.json();
	return packageWithDependenciesSchema.parse(data);
};
