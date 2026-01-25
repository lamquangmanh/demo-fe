// ui/theme/palette.ts
import { alpha } from '@mui/material/styles';
import { materioColors } from './colors';

export const palette = {
  mode: 'dark' as const,

  primary: materioColors.primary,

  background: {
    default: materioColors.dark.bg,
    paper: materioColors.dark.paper,
  },

  text: materioColors.text,

  divider: materioColors.dark.border,
  action: {
    selected: alpha('#7367F0', 0.12), // 👈 chỗ này
    hover: alpha('#7367F0', 0.08),
    disabled: alpha('#FFFFFF', 0.3),
  },
};
