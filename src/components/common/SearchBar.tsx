import { useRouter } from 'next/router';
import React from 'react';
import { useSearch } from '../../hooks/useSearch';

export function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
    const router = useRouter();

    const {
        rawQuery,
        cleanQuery,
        prevQuery,
        setQuery,
        setSearched,
    } = useSearch(initialQuery);

    const performSearch = () => {
        if (cleanQuery && cleanQuery !== prevQuery) {
            setSearched();

            router.push({
                pathname: '/search',
                query: { query: cleanQuery },
            });
        }
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
            return;
        }

        performSearch();
    };

    const onButtonClick = () => {
        performSearch();
    };

    return (
        <div className="relative w-full">
            <input
                className="w-full py-3 pl-4 pr-16 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900"
                id="search-bar"
                type="search"
                name="q"
                placeholder="Search packages"
                value={rawQuery}
                onChange={onInputChange}
                onKeyPress={onEnterKeyPress}
            />

            <button
                className="absolute inset-y-0 right-0 px-4 text-gray-600 border-l border-gray-300 dark:border-gray-700 hover:text-gray-800 dark:text-gray-500 dark-hover:text-gray-300"
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
}
