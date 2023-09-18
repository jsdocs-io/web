import { z } from 'zod';

export const repositorySchema = z.object({
	type: z.string(),
	url: z.string(),
	directory: z.string().optional()
});

export type Repository = z.infer<typeof repositorySchema>;
