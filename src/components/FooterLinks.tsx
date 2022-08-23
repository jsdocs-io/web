import Link from "next/link";

const links = [
  { href: "/", text: "Home" },
  { href: "/guide", text: "Guide" },
  { href: "/sponsor", text: "Donate" },
  { href: "/about", text: "About" },
  { href: "/credits", text: "Credits" },
  { href: "/privacy", text: "Privacy" },
  { href: "https://github.com/jsdocs-io", text: "GitHub" },
  { href: "https://github.com/jsdocs-io/web/issues", text: "Issues" },
  { href: "https://twitter.com/jsDocs", text: "Twitter" },
];

const FooterLinks = () => {
  return (
    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
      {links.map(({ href, text }) => (
        <li key={href}>
          <Link href={href}>
            <a className="block text-center p-2 hover:underline">{text}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
