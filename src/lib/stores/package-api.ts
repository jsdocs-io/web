import { getContext, hasContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { z } from 'zod';

const packageApiKey = Symbol();

const packageApiSchema = z.object({
	analyzedAt: z.string(),
	analysisDuration: z.number()
});

export type PackageApi = z.infer<typeof packageApiSchema>;

export const setPackageApi = () => {
	const { subscribe, set } = writable();
	setContext(packageApiKey, {
		subscribe,
		set(value: unknown) {
			set(packageApiSchema.parse(value));
		}
	});
};

export const getPackageApi = (): Writable<PackageApi> => {
	return getContext(packageApiKey);
};

export const hasPackageApi = (): boolean => {
	return hasContext(packageApiKey);
};
