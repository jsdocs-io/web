import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { darkModeScriptMinified } from "../data/dark-mode-script";
import { windowScriptMinified } from "../data/window-script";

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id="jsdocsio-namespace-script"
          dangerouslySetInnerHTML={{ __html: windowScriptMinified }}
          strategy="beforeInteractive"
        />
        <Script
          id="dark-mode-script"
          dangerouslySetInnerHTML={{ __html: darkModeScriptMinified }}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
};

export default MyDocument;
