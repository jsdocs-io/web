import { z } from 'zod';

const packageInfoSchema = z.object({
	name: z.string(),
	version: z.string(),
	publishedAt: z.string(),
	unpackedSize: z.number(),
	dependencies: z.record(z.string()),
	license: z.string().optional(),
	repository: z.string(),
	weeklyDownloads: z.number()
});

export type PackageInfo = z.infer<typeof packageInfoSchema>;

export const fetchPackageInfo = async (
	fetch: typeof window.fetch,
	name: string,
	version = 'latest'
): Promise<PackageInfo> => {
	return packageInfoSchema.parse({
		name,
		version: '1.0.0',
		publishedAt: '2023-01-01',
		unpackedSize: 100000,
		dependencies: {
			'@sveltejs/adapter-vercel': '1.0.0',
			'@sveltejs/kit': '1.0.0'
		},
		license: 'MIT',
		repository: 'https://github.com/sveltejs/svelte',
		weeklyDownloads: 1000
	});
};
