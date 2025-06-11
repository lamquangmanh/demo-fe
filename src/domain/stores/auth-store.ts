import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      setAccessToken: (accessToken: string) =>
        set((state: AuthState) => {
          return {
            ...state,
            accessToken,
            isAuthenticated: accessToken !== null,
          };
        }),
      setRefreshToken: (refreshToken: string) =>
        set((state: AuthState) => {
          return { ...state, refreshToken };
        }),
      clear: () =>
        set({ isAuthenticated: false, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
