(function () {
    function enableDarkMode() {
        document.documentElement.classList.add('mode-dark');
        localStorage.setItem('theme', 'dark');
    }

    const theme = localStorage.getItem('theme');
    const wantDarkMode = theme === 'dark';
    const wantLightMode = theme === 'light';
    const preferDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;

    if (wantDarkMode || (preferDarkMode && !wantLightMode)) {
        enableDarkMode();
    }
})();
