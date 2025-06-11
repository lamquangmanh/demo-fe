import { create } from 'zustand';
import { SuperMenu, Menu } from '@/infrastructure/graphql/generated';

// import from common
import { IAppList } from '@/common/interfaces';
import { getAppListFromSuperMenus } from '@/common/utils';

export interface MenuState {
  superMenus: SuperMenu[];
  menus: Menu[];
  appList: IAppList[];
  setSuperMenus: (superMenus: SuperMenu[]) => void;
  setMenus: (menus: Menu[]) => void;
  clearAll: () => void;
  clearMenus: () => void;
  clearSuperMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  superMenus: [],
  menus: [],
  appList: [],
  setSuperMenus: (superMenus: SuperMenu[]) =>
    set((state: MenuState) => {
      return {
        ...state,
        superMenus,
        appList: getAppListFromSuperMenus(superMenus),
      };
    }),
  setMenus: (menus: Menu[]) =>
    set((state: MenuState) => {
      return { ...state, menus };
    }),
  clearMenus: () =>
    set((state: MenuState) => {
      return { ...state, menus: [] };
    }),
  clearSuperMenu: () =>
    set((state: MenuState) => {
      return { ...state, superMenus: [] };
    }),
  clearAll: () => set({ superMenus: [], menus: [], appList: [] }),
}));
