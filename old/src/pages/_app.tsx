import type { AppProps } from "next/app";
import "../../node_modules/nprogress/nprogress.css";
import "../../node_modules/prismjs/themes/prism-tomorrow.css";
import "../../styles/index.css";
import loadNProgress from "../lib/load-nprogress";

loadNProgress();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
