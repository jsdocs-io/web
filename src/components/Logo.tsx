import clsx from "clsx";
import Link from "next/link";

const Logo = ({ hideText = false }: { hideText?: boolean }) => {
  return (
    <Link href="/" legacyBehavior>
      <a className="flex flex-none items-center space-x-2" title="jsDocs.io">
        <img
          className="h-8 flex-none"
          src="/logo.png"
          alt="Logo for jsDocs.io"
        />
        <span
          className={clsx(
            "text-2xl font-bold",
            hideText ? "hidden sm:block" : "block"
          )}
        >
          jsDocs.io
        </span>
      </a>
    </Link>
  );
};

export default Logo;
