export const handleQuickSearchHotkey = (_: HTMLElement) => {
	const handleKeyDown = async (event: KeyboardEvent) => {
		const dialog = document.querySelector<HTMLDialogElement>('#quick-search');
		if (event.key === 'f' && dialog && !dialog.open) {
			event.preventDefault();
			dialog.showModal();
		}
	};

	window.addEventListener('keydown', handleKeyDown, true);

	const destroy = () => {
		window.removeEventListener('keydown', handleKeyDown, true);
	};

	return { destroy };
};
