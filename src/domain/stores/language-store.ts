import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// import from infrastructure
import i18n from '@/infrastructure/i18n/i18n';

export interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => {
        // console.log('hydration starts');
        // optional
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            console.log('hydration finished');
            i18n.changeLanguage(state?.language ?? 'en');
          }
        };
      },
    }
  )
);
