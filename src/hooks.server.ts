import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier';

// See https://kit.svelte.dev/docs/migrating#integrations-html-minifier
// and https://github.com/kangax/html-minifier.
const minificationOptions = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: false,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: false,
	removeComments: false,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

export const handle = (async ({ event, resolve }) => {
	let page = '';

	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html;
			if (done) {
				return building ? minify(page, minificationOptions) : page;
			}
		}
	});
}) satisfies Handle;
