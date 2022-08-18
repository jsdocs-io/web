import { sanitizeUrl } from "@braintree/sanitize-url";
import React from "react";

export function A({
  href: rawHref,
  title,
  children,
}: {
  href: string;
  title?: string;
  children: React.ReactNode;
}) {
  const href = sanitizeUrl(rawHref);

  return (
    <a
      className="text-blue-700 break-words dark:text-blue-300 hover:underline"
      href={href}
      title={title}
    >
      {children}
    </a>
  );
}
