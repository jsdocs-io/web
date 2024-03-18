import { z } from "zod";

const serverEnvSchema = z.object({
	VERCEL: z
		.string()
		.optional()
		.transform((value) => Boolean(value)),
	BUN_PATH: z.string().default("bun"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const serverEnv = serverEnvSchema.parse(process.env);
