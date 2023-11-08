import type { Action } from 'svelte/action';

export const quickSearchHotkey: Action = () => {
	const dialog = document.querySelector<HTMLDialogElement>('#quick-search');
	const handleKeyDown = async (event: KeyboardEvent) => {
		if (dialog && !dialog.open && event.key === 'f') {
			event.preventDefault();
			dialog.showModal();
		}
	};

	window.addEventListener('keydown', handleKeyDown, true);

	return {
		destroy() {
			window.removeEventListener('keydown', handleKeyDown, true);
		}
	};
};
