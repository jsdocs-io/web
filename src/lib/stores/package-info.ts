import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { z } from 'zod';

const packageInfoKey = 'package-info';

const packageInfoSchema = z.object({
	name: z.string(),
	version: z.string(),
	repository: z.string().optional(),
	publishedAt: z.string(),
	homepage: z.string().optional(),
	license: z.string().optional(),
	dependencies: z.record(z.string()),
	weeklyDownloads: z.number().optional(),
	unpackedSize: z.number().optional()
});

export type PackageInfo = z.infer<typeof packageInfoSchema>;

export const setPackageInfo = () => {
	const { subscribe, set } = writable();
	setContext(packageInfoKey, {
		subscribe,
		set(value: unknown) {
			set(packageInfoSchema.parse(value));
		}
	});
};

export const getPackageInfo = (): Writable<PackageInfo> => {
	return getContext(packageInfoKey);
};
