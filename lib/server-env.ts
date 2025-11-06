import { z } from "zod";

const serverEnvSchema = z.object({
	// Vercel platform.
	VERCEL: z.coerce.boolean().default(false),

	// Bun package manager.
	// See `astro.config.mjs` for Vercel path explanation.
	BUN_PATH: z.string().default(import.meta.env.VERCEL ? "/var/task/bun1/bun" : "bun"),

	// Cloudflare R2 bucket.
	CF_ACCOUNT_ID: z.string().default(""),
	CF_ACCESS_KEY_ID: z.string().default(""),
	CF_SECRET_ACCESS_KEY: z.string().default(""),
	CF_BUCKET_NAME: z.string().default(""),

	// Packages not to be analyzed.
	IGNORED_PACKAGES: z
		.string()
		.default("")
		.transform((csv) => {
			return new Set(
				csv
					.split(",")
					.map((pkg) => pkg.trim())
					.filter(Boolean),
			);
		}),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const serverEnv = serverEnvSchema.parse(import.meta.env);
