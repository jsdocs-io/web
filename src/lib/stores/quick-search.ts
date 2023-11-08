import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const quickSearchDialogKey = 'quick-search-dialog';
const quickSearchQueryKey = 'quick-search-query';

export const setQuickSearchDialog = () => {
	setContext(quickSearchDialogKey, writable(undefined));
};

export const getQuickSearchDialog = (): Writable<HTMLDialogElement | undefined> => {
	return getContext(quickSearchDialogKey);
};

export const setQuickSearchQuery = () => {
	setContext(quickSearchQueryKey, writable(''));
};

export const getQuickSearchQuery = (): Writable<string> => {
	return getContext(quickSearchQueryKey);
};

export const setQuickSearchStores = () => {
	setQuickSearchDialog();
	setQuickSearchQuery();
};
