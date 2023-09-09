import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import useDarkMode from "use-dark-mode";

const ThemeButton = () => {
  const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode(
    localStorage.darkMode === "true",
    {
      element: document.documentElement,
      classNameDark: "dark",
      classNameLight: "light",
    }
  );

  return (
    <button
      className={clsx(
        "block p-2 rounded",
        "text-stone-500",
        "hover:text-stone-900 hover:bg-stone-200",
        "dark:hover:text-stone-100 dark:hover:bg-stone-700"
      )}
      onClick={toggleDarkMode}
      title="Toggle dark mode"
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 fill-current" />
      ) : (
        <MoonIcon className="h-5 w-5 fill-current" />
      )}
    </button>
  );
};

export default ThemeButton;
