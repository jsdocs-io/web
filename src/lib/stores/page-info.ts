import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { z } from 'zod';

const pageInfoKey = Symbol();

const pageInfoSchema = z.object({
	updatedAt: z.string()
});

export type PageInfo = z.infer<typeof pageInfoSchema>;

export const setPageInfo = () => {
	const { subscribe, set } = writable();
	setContext(pageInfoKey, {
		subscribe,
		set(value: unknown) {
			set(pageInfoSchema.parse(value));
		}
	});
};

export const getPageInfo = (): Writable<PageInfo> => {
	return getContext(pageInfoKey);
};
