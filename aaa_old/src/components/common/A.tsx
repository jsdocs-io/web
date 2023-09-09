import { sanitizeUrl } from "@braintree/sanitize-url";
import React from "react";

const A = ({
  href: rawHref,
  title,
  children,
}: {
  href: string;
  title?: string;
  children: React.ReactNode;
}) => {
  const href = sanitizeUrl(rawHref);

  return (
    <a
      className="text-sky-700 break-words dark:text-sky-300 hover:underline"
      href={href}
      title={title}
    >
      {children}
    </a>
  );
};

export default A;
