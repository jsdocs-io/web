import { useEffect } from 'react';

/**
 * Refresh the location hash to make browsers scroll
 * to the provided anchor link.
 */
export function useLocationHashRefresh(): void {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash !== '') {
            window.location.hash = '';
            setTimeout(() => {
                window.location.hash = hash;
            });
        }
    });
}
