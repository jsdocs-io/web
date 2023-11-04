import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:arrowup'?: (event: any) => any;
			'on:arrowdown'?: (event: any) => any;
			'on:enter'?: (event: any) => any;
		}
	}
}

export {};
