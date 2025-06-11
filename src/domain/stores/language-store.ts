import { create } from 'zustand';

// import from infrastructure
import i18n from '@/infrastructure/i18n/i18n';

export interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language: string) =>
    set((state: LanguageState) => {
      // Update i18n language
      i18n.changeLanguage(language);
      return {
        ...state,
        language,
      };
    }),
}));
