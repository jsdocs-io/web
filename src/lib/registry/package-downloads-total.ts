import { z } from 'zod';

export const packageDownloadsTotalSchema = z.object({
	/** Total number of downloads. */
	downloads: z.number(),
	/** Download period start date (inclusive). */
	start: z.string(),
	/** Download period end date (inclusive). */
	end: z.string(),
	/** Package name. */
	package: z.string()
});

/**
 * `PackageDownloadsTotal` contains the total number of downloads from the registry for a package for a given period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export type PackageDownloadsTotal = z.infer<typeof packageDownloadsTotalSchema>;
