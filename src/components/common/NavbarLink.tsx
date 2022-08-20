import Link from "next/link";

const NavbarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="block p-2 text-lg font-bold rounded hover:bg-stone-200 dark:hover:bg-stone-700">
        {children}
      </a>
    </Link>
  );
};

export default NavbarLink;
