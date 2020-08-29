import { useEffect, useState } from 'react';

export interface DarkModeHook {
    readonly isDarkMode: boolean;
    readonly toggleDarkMode: () => void;
}

export function useDarkMode(): DarkModeHook {
    const isBrowser = typeof window !== 'undefined';

    const themeKey = 'theme';
    const themeLight = 'light';
    const themeDark = 'dark';
    const themeLocal = isBrowser ? localStorage.getItem(themeKey) : undefined;

    const [isDarkMode, setDarkMode] = useState(themeLocal === themeDark);
    const toggleDarkMode = () => {
        const isNowDarkMode = !isDarkMode;
        setDarkMode(isNowDarkMode);
        localStorage.setItem(themeKey, isNowDarkMode ? themeDark : themeLight);
    };

    useEffect(() => {
        const htmlTagClasses = document.documentElement.classList;
        isDarkMode
            ? htmlTagClasses.add('mode-dark')
            : htmlTagClasses.remove('mode-dark');
    });

    return { isDarkMode, toggleDarkMode };
}
