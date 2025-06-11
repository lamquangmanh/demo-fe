'use client';

import { useEffect } from 'react';

// import from domain stores
import { useLanguageStore } from '@/domain/stores';

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const language = useLanguageStore((state) => state.language);
  useEffect(() => {
    console.log('LanguageProvider change:', language);
  }, [language]);
  return <>{children}</>;
};
