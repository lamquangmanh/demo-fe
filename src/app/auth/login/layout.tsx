import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import { Geist, Geist_Mono } from 'next/font/google';

// import globals css
import '../../globals.css';
import { THEME_CONFIG } from '@/constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

// this layout is used for login page or unauthorized page
export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider theme={THEME_CONFIG}>{children}</ConfigProvider>
      </body>
    </html>
  );
}
