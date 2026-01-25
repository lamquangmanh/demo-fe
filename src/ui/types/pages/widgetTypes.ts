// Type Imports
import type { ThemeColor } from '@ui/core/types';
import type { OptionsMenuType } from '@ui/core/components/option-menu/types';
import type { CustomAvatarProps } from '@ui/core/components/mui/Avatar';

export type CardStatsVerticalProps = {
  title: string;
  stats: string;
  avatarIcon: string;
  subtitle: string;
  avatarColor?: ThemeColor;
  trendNumber: string;
  trend?: 'positive' | 'negative';
  avatarSkin?: CustomAvatarProps['skin'];
  avatarSize?: number;
  moreOptions?: OptionsMenuType;
};
