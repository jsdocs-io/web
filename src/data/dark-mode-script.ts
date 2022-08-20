export const darkModeScript = `
if (localStorage.darkMode === 'true' || (!localStorage.darkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    localStorage.darkMode = 'true';
} else {
    document.documentElement.classList.remove('dark');
    localStorage.darkMode = 'false';
}`;

export const darkModeScriptMinified = `"true"===localStorage.darkMode||!localStorage.darkMode&&window.matchMedia("(prefers-color-scheme: dark)").matches?(document.documentElement.classList.add("dark"),localStorage.darkMode="true"):(document.documentElement.classList.remove("dark"),localStorage.darkMode="false")`;
