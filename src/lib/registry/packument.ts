import { manifestSchema } from '$lib/registry/manifest';
import { z } from 'zod';

export const packumentSchema = z.object({
	name: z.string(),
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
		.catchall(z.string()),
	versions: z.record(manifestSchema)
});

export type Packument = z.infer<typeof packumentSchema>;
