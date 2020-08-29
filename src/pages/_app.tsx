import type { AppProps } from 'next/app';
import React from 'react';
import '../../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
