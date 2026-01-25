// ui/providers/UiProvider.tsx
'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../theme/theme';

export function UiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
