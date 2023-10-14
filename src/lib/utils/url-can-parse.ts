// TODO: replace with URL.canParse when supported by all browsers.
// See: https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static#browser_compatibility.
export const urlCanParse = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};
