import { fetchManifest } from '$lib/registry/fetch-manifest';
import { manifestSchema } from '$lib/registry/manifest';
import type { z } from 'zod';

const packageDependenciesSchema = manifestSchema.pick({
	dependencies: true,
	devDependencies: true,
	peerDependencies: true
});

export type PackageDependencies = z.infer<typeof packageDependenciesSchema>;

export const fetchPackageDependencies = async (
	fetch: typeof window.fetch,
	name: string,
	version = 'latest'
): Promise<PackageDependencies> => {
	const manifest = await fetchManifest(fetch, name, version);
	return packageDependenciesSchema.parse(manifest);
};
