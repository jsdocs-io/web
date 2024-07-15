import type { AlpineComponent } from "alpinejs";

// See https://github.com/alpinejs/alpine/issues/2199#issuecomment-1809892127.
export const defineComponent = <P, T>(fn: (params: P) => AlpineComponent<T>) => fn;
