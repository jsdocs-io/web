import Link from "next/link";
import A from "./A";
import InternalLink from "./InternalLink";
import PoweredByVercelBanner from "./PoweredByVercelBanner";

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-100 border-t border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <div>
        <div className="sm:flex sm:justify-between sm:items-center">
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="flex items-center space-x-3" title="jsDocs.io">
              <img className="h-8" src="/logo.png" alt="jsDocs.io logo" />

              <span className="text-2xl font-bold">jsDocs.io</span>
            </a>
          </Link>

          <div className="hidden sm:block">
            <PoweredByVercelBanner />
          </div>
        </div>

        <ul className="mt-2 space-y-1 font-bold lg:flex lg:space-x-3 lg:space-y-0">
          <li>
            <InternalLink href="/about">About</InternalLink>
          </li>

          <li>
            <InternalLink href="/guide">Guide</InternalLink>
          </li>

          <li>
            <InternalLink href="/sponsor">Sponsor</InternalLink>
          </li>

          <li>
            <InternalLink href="/credits">Credits</InternalLink>
          </li>

          <li>
            <InternalLink href="/privacy">Privacy Policy</InternalLink>
          </li>

          <li>
            <A href="https://github.com/jsdocs-io/web/issues">
              Report an Issue
            </A>
          </li>

          <li>
            <A href="https://github.com/jsdocs-io">GitHub</A>
          </li>

          <li>
            <A href="https://twitter.com/jsDocs">Twitter</A>
          </li>
        </ul>
      </div>

      <div className="flex justify-end mt-8 sm:hidden">
        <PoweredByVercelBanner />
      </div>
    </footer>
  );
};

export default Footer;
