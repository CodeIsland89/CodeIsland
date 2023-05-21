/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { AppProps } from 'next/app';
import '../global/css/global.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
