import type { Action } from 'svelte/action';

export const quickSearchResultsKeyboard: Action = (node) => {
	const dialog = document.querySelector<HTMLDialogElement>('#quick-search');
	const keys = new Set(['ArrowUp', 'ArrowDown', 'Enter']);

	const handleKeyboard = (event: KeyboardEvent) => {
		if (dialog && dialog.open && keys.has(event.key)) {
			event.preventDefault();
			node.dispatchEvent(new CustomEvent(event.key.toLowerCase()));
		}
	};

	window.addEventListener('keydown', handleKeyboard, true);

	return {
		destroy() {
			window.removeEventListener('keydown', handleKeyboard, true);
		}
	};
};
