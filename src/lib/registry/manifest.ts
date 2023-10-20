import { repositorySchema } from '$lib/registry/repository';
import { z } from 'zod';

export const manifestSchema = z.object({
	name: z.string(),
	version: z.string(),
	description: z.string().optional(),
	keywords: z.array(z.string()).catch([]),
	homepage: z.string().optional(),
	license: z.string().optional(),
	type: z.string().optional(),
	types: z.string().optional(),
	typings: z.string().optional(),
	sideEffects: z.boolean().optional(),
	repository: repositorySchema.optional(),
	dependencies: z.record(z.string()).catch({}),
	devDependencies: z.record(z.string()).catch({}),
	peerDependencies: z.record(z.string()).catch({}),
	dist: z.object({
		fileCount: z.number().optional(),
		unpackedSize: z.number().optional()
	})
});

export type Manifest = z.infer<typeof manifestSchema>;
