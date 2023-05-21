/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { AppProps } from 'next/app';
import '../global/css/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Component {...pageProps} />
    </>
  );
}
