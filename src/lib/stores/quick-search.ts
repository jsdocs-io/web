import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const quickSearchDialogKey = 'quick-search-dialog';

export const setQuickSearchDialog = () => {
	setContext(quickSearchDialogKey, writable<HTMLDialogElement | undefined>(undefined));
};

export const getQuickSearchDialog = () => {
	return getContext<Writable<HTMLDialogElement | undefined>>(quickSearchDialogKey);
};
