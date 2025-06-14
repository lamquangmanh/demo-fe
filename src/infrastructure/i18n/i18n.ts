import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommonFile from '@/common/locales/en/common.json';
import enIamFile from '@/common/locales/en/iam.json';

import viCommonFile from '@/common/locales/vi/common.json';

i18n
  // .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommonFile, iam: enIamFile },
      vi: { common: viCommonFile },
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
