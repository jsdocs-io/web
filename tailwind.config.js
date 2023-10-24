/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'3xl': '1600px',
				'4xl': '1920px'
			}
		}
	},
	daisyui: {
		logs: false
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
