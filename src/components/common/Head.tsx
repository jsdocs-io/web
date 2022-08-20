import NextHead from "next/head";

const Head = () => {
  return (
    <NextHead>
      <meta charSet="utf-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3182ce" />
      <meta name="msapplication-TileColor" content="#2d3748" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="theme-color" content="#2d3748" />

      {/* Global Open Graph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.jsdocs.io/logo-bg.png" />
      <meta property="og:image:alt" content="jsDocs.io logo" />
      <meta property="og:site_name" content="jsDocs.io" />

      {/* Global Twitter card tags */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="@jsDocs" />
      <meta
        property="twitter:image"
        content="https://www.jsdocs.io/logo-bg.png"
      />
      <meta property="twitter:image:alt" content="jsDocs.io logo" />

      {/* Plausible.io analytics */}
      {/* See https://github.com/vercel/next.js/issues/9070#issuecomment-552981178 */}
      {process.env.NODE_ENV === "production" && process.browser && (
        <script
          async
          defer
          data-domain="jsdocs.io"
          src="https://plausible.io/js/plausible.outbound-links.js"
        />
      )}
    </NextHead>
  );
};

export default Head;
