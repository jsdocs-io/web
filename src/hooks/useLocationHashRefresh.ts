import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Refresh the location hash to make browsers scroll
 * to the anchor link present in the URL.
 */
export function useLocationHashRefresh(): void {
    const router = useRouter();

    useEffect(() => {
        /**
         * Preserve hash for redirects on package documentation pages.
         *
         * For example, preserve the hash `#bar`
         * when going from the fallback page `/package/foo#bar`
         * to the versioned page `/package/foo/v/1.0.0#bar`.
         */
        if (router.isFallback) {
            window.jsdocsio.prevHash = window.location.hash;
            return;
        }

        const hash = window.jsdocsio.prevHash || window.location.hash;
        if (hash !== '') {
            setTimeout(() => {
                window.location.hash = '';
                window.location.hash = hash;

                window.jsdocsio.prevHash = undefined;
            });
        }
    });
}
