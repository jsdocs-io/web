/* istanbul ignore file */

import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import '../../node_modules/nprogress/nprogress.css';
import '../../node_modules/prismjs/themes/prism-tomorrow.css';
import '../../styles/index.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
