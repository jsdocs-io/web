export const handleQuickSearchHotkey = (_: HTMLElement, openQuickSearch: () => void) => {
	const handleKeyDown = async (event: KeyboardEvent) => {
		if (event.key === 'f') {
			event.preventDefault();
			openQuickSearch();
		}
	};

	window.addEventListener('keydown', handleKeyDown, true);

	const destroy = () => {
		window.removeEventListener('keydown', handleKeyDown, true);
	};

	return { destroy };
};
