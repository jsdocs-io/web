import Link from "next/link";

const FooterLogo = () => {
  return (
    <Link href="/">
      <a className="flex items-center space-x-2" title="jsDocs.io">
        <img className="h-8" src="/logo.png" alt="jsDocs.io logo" />
        <span className="text-2xl font-bold">jsDocs.io</span>
      </a>
    </Link>
  );
};

export default FooterLogo;
