import { useEffect, useState } from 'react';

export interface DarkModeHook {
    readonly isDarkMode: boolean;
    readonly toggleDarkMode: () => void;
}

export function useDarkMode(): DarkModeHook {
    if (typeof window === 'undefined') {
        return {
            isDarkMode: false,
            toggleDarkMode: () => {},
        };
    }

    const themeKey = 'theme';
    const themeLight = 'light';
    const themeDark = 'dark';
    const themeLocal = localStorage.getItem(themeKey);

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
