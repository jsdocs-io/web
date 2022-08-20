import { useRouter } from "next/router";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useSearch from "../../hooks/useSearch";

const SearchBar = ({ initialQuery = "" }: { initialQuery?: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys("s", (event) => {
    window.scrollTo(0, 0);
    inputRef.current?.focus();
    event.preventDefault();
  });

  const router = useRouter();

  const { rawQuery, cleanQuery, prevQuery, setQuery, setSearched } =
    useSearch(initialQuery);

  const performSearch = () => {
    if (cleanQuery && cleanQuery !== prevQuery) {
      setSearched();

      router.push({
        pathname: "/search",
        query: { query: cleanQuery },
      });
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    performSearch();
  };

  const onButtonClick = () => {
    performSearch();
  };

  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor="search-bar">
        Search packages (Press {"'s'"} to focus search bar)
      </label>

      <input
        className="w-full py-3 pl-4 pr-16 border border-stone-300 rounded dark:border-stone-700 dark:bg-stone-900"
        id="search-bar"
        type="search"
        name="q"
        placeholder="Search packages [s]"
        value={rawQuery}
        onChange={onInputChange}
        onKeyDown={onEnterKeyPress}
        ref={inputRef}
        autoFocus={router.pathname === "/"}
      />

      <button
        className="absolute inset-y-0 right-0 px-4 text-stone-600 border-l border-stone-300 dark:border-stone-700 hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-300"
        title="Search"
        type="button"
        onClick={onButtonClick}
      >
        <svg viewBox="0 0 20 20" className="w-6 h-6 fill-current">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
