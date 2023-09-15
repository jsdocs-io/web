import { REGISTRY_API_URL } from '$env/static/private';
import { z } from 'zod';

const endpoint = REGISTRY_API_URL;

const packageDependenciesSchema = z.object({
	dependencies: z.record(z.string()).catch({}),
	devDependencies: z.record(z.string()).catch({}),
	peerDependencies: z.record(z.string()).catch({})
});

export type PackageDependencies = z.infer<typeof packageDependenciesSchema>;

export const fetchPackageDependencies = async (
	fetch: typeof window.fetch,
	name: string,
	version = 'latest'
): Promise<PackageDependencies> => {
	const response = await fetch(`${endpoint}/${name}/${version}`);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.json();
	return packageDependenciesSchema.parse(data);
};
