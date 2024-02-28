import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Logo from "../Logo";
import NavbarLinks from "./NavbarLinks";
import SearchBar from "./SearchBar";

// ThemeButton must render on client since it depends on dark mode state
const ThemeButton = dynamic(() => import("../ThemeButton"), { ssr: false });

const Navbar = () => {
  const router = useRouter();
  const showSearchBar = !["/", "/search"].includes(router.pathname);

  return (
    <header className="px-4 py-3 bg-white border-b border-stone-300 dark:bg-stone-900 dark:border-stone-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center shrink-0 p-1 space-x-8">
          <Logo hideText={showSearchBar} />

          <div className="hidden lg:block">
            <NavbarLinks />
          </div>
        </div>

        <div className="flex items-center grow ml-4 -mr-2 space-x-2 sm:ml-8 md:grow-0 md:w-1/2 xl:w-1/3">
          {showSearchBar && <SearchBar />}

          <div className="ml-auto">
            <ThemeButton />
          </div>
        </div>
      </div>

      <div className="mt-3 -ml-2 lg:hidden lg:m-0">
        <NavbarLinks />
      </div>
    </header>
  );
};

export default Navbar;
