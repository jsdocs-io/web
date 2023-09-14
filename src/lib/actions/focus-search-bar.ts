export const focusSearchBar = (input: HTMLInputElement) => {
	const handleKeyDown = async (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'k') {
			event.preventDefault();
			input.focus();
		}
	};

	window.addEventListener('keydown', handleKeyDown, true);

	const destroy = () => {
		window.removeEventListener('keydown', handleKeyDown, true);
	};

	return { destroy };
};
