import { manifestSchema } from '$lib/registry/manifest';
import { repositorySchema } from '$lib/registry/repository';
import { z } from 'zod';

export const packumentSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
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
	versions: z.record(manifestSchema),
	keywords: z.array(z.string()).optional(),
	repository: repositorySchema.optional(),
	license: z.string().optional()
});

export type Packument = z.infer<typeof packumentSchema>;
