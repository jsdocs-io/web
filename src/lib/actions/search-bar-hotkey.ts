import type { Action } from 'svelte/action';

export const searchBarHotkey: Action<HTMLInputElement> = (node) => {
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'k') {
			event.preventDefault();
			node.focus();
		}
	};

	window.addEventListener('keydown', handleKeyDown, true);

	return {
		destroy() {
			window.removeEventListener('keydown', handleKeyDown, true);
		}
	};
};
