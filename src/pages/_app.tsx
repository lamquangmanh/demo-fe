import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';
import { ConfigProvider } from 'antd';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default appWithTranslation(function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#f759ab',
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>,
  );
});
