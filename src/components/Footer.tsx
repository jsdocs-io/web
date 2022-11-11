import clsx from "clsx";
import FooterLinks from "./FooterLinks";
import Logo from "./Logo";
import PoweredByVercelBanner from "./PoweredByVercelBanner";

const Footer = () => {
  return (
    <footer
      className={clsx(
        "p-4 border-t mt-auto",
        "bg-stone-100 border-stone-300",
        "dark:bg-stone-900 dark:border-stone-700"
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <FooterLinks />
        <PoweredByVercelBanner />
      </div>
    </footer>
  );
};

export default Footer;
