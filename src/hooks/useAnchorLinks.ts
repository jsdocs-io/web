import AnchorJS from 'anchor-js';
import { useEffect } from 'react';

export function useAnchorLinks(): void {
    useEffect(() => {
        const anchors = new AnchorJS();
        anchors.add('h2, h3');
    }, []);
}
