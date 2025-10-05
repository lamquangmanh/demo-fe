'use client';
import '@ant-design/v5-patch-for-react-19';

import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';

// import globals css
import 'antd/dist/reset.css';
import './globals.css';

import {
  GraphqlProvider,
  AntdProvider,
  LanguageProvider,
  NotificationProvider,
} from '@/presentation/providers';
// import authorized layout
import AuthorizedLayout from '@/presentation/layouts/AuthorizedLayout';

// init i18n
import '@/infrastructure/i18n/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type LayoutProps = {
  children: React.ReactNode;
};

// this layout is used for all pages after login successfully
function RootLayout({ children }: LayoutProps) {
  const pathname = usePathname();

  // ignore layout for health check page
  const isIgnoreLayout = ['/health'].includes(pathname);

  // ignore layout for auth pages
  const isAuthPage = ['/auth/login', '/auth/forgot-password'].includes(
    pathname
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isIgnoreLayout && <>{children}</>}
        {!isIgnoreLayout && (
          <GraphqlProvider>
            <NotificationProvider>
              <LanguageProvider>
                <AntdProvider>
                  {isAuthPage && <>{children}</>}
                  {!isAuthPage && (
                    <AuthorizedLayout>{children}</AuthorizedLayout>
                  )}
                </AntdProvider>
              </LanguageProvider>
            </NotificationProvider>
          </GraphqlProvider>
        )}
      </body>
    </html>
  );
}

export default RootLayout;
