'use client';

import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';

const localeMap = {
  en: enUS,
  vi: viVN,
};

import { THEME_CONFIG } from '@/common';
import { useLanguageStore } from '@/domain/stores';

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore();

  const typedLocale = language as keyof typeof localeMap;

  return (
    <ConfigProvider
      theme={THEME_CONFIG}
      locale={localeMap[typedLocale] || enUS}
    >
      {children}
    </ConfigProvider>
  );
}
