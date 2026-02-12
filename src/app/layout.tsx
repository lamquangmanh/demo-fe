'use client';

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css';

import { usePathname } from 'next/navigation';

// Type Imports
import type { ChildrenType } from '@ui/core/types';

// Style Imports
import './globals.css';

// Generated Icon CSS Imports
import '@ui/assets/iconify-icons/generated-icons.css';

// init i18n
import '@/infrastructure/i18n/i18n';

import {
  GraphqlProvider,
  LanguageProvider,
  NotificationProvider,
} from '@/presentation/providers';

// import authorized layout
import AuthorizedLayout from '@/presentation/layouts/AuthorizedLayout';

// export const metadata = {
//   title: 'Materio',
//   description: 'Materio Next.js MUI Admin Template',
// };

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr';

  const pathname = usePathname();

  // ignore layout for health check page
  const isIgnoreLayout = ['/healthz'].includes(pathname);

  // ignore layout for auth pages
  const isAuthPage = ['/auth/login', '/auth/forgot-password', '/test'].includes(
    pathname,
  );

  return (
    <html id="__next" dir={direction}>
      <body className="flex is-full min-bs-full flex-auto flex-col">
        {isIgnoreLayout && <>{children}</>}
        {!isIgnoreLayout && (
          <GraphqlProvider>
            <NotificationProvider>
              <LanguageProvider>
                {isAuthPage && <>{children}</>}
                {!isAuthPage && <AuthorizedLayout>{children}</AuthorizedLayout>}
              </LanguageProvider>
            </NotificationProvider>
          </GraphqlProvider>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
