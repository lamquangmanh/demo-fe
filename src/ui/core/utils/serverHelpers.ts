import 'server-only';

// Next Imports
import { cookies } from 'next/headers';

// Type Imports
import type { Settings } from '@ui/core/contexts/settingsContext';
import type { SystemMode } from '@ui/core/types';

// Config Imports
import themeConfig from '@ui/configs/themeConfig';

export const getSettingsFromCookie = async (): Promise<Settings> => {
  const cookieStore = await cookies();

  const cookieName = themeConfig.settingsCookieName;

  try {
    const value = cookieStore.get(cookieName)?.value;
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

export const getMode = async (): Promise<SystemMode> => {
  // const settings = await getSettingsFromCookie();

  // // Get mode from cookie or fallback to theme config
  // const _mode = settings.mode || themeConfig.mode;

  // return _mode;
  return 'dark';
};

export const getSystemMode = async (): Promise<SystemMode> => {
  return await getMode();
};

export const getServerMode = async (): Promise<SystemMode> => {
  return await getMode();
};
