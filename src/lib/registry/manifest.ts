import { z } from 'zod';

export const manifestSchema = z.object({
	name: z.string(),
	version: z.string(),
	description: z.string().optional(),
	license: z.string().optional(),
	types: z.string().optional(),
	typings: z.string().optional(),
	dependencies: z.record(z.string()).catch({}),
	dist: z.object({
		unpackedSize: z.number().optional()
	})
});

export type Manifest = z.infer<typeof manifestSchema>;
