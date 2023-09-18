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
	keywords: z.array(z.string()).optional(),
	repository: z
		.object({
			type: z.string(),
			url: z.string(),
			directory: z.string().optional()
		})
		.optional(),
	license: z.string().optional()
});

export type Packument = z.infer<typeof packumentSchema>;
