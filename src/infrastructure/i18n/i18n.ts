import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommonFile from '@/common/locales/en/common.json';
import enIamFile from '@/common/locales/en/iam.json';
import enErrorFile from '@/common/locales/en/error.json';

import viCommonFile from '@/common/locales/vi/common.json';
import viIamFile from '@/common/locales/vi/iam.json';
import viErrorFile from '@/common/locales/vi/error.json';

i18n
  // .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommonFile, iam: enIamFile, error: enErrorFile },
      vi: { common: viCommonFile, iam: viIamFile, error: viErrorFile },
    },
    lng: 'en',
    fallbackLng: 'en',
    detection: {
      // Disable browser/localStorage detection if you want full control
      order: [],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
