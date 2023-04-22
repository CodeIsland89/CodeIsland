import React from 'react';
import { AppProps } from 'next/app';
import GlobalStyle from '../theme/globalStyles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
