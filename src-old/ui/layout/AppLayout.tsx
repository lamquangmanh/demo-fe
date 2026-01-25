// ui/layout/AppLayout.tsx
'use client';

import { Box } from '@mui/material';
import { Sidebar } from './sidebar/Sidebar';
import { Header } from './Header';

const SIDEBAR_WIDTH = 260;
const HEADER_HEIGHT = 64;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" minHeight="100vh" bgcolor="background.default">
      <Sidebar width={SIDEBAR_WIDTH} />

      <Box flex={1} ml={`${SIDEBAR_WIDTH}px`}>
        <Header height={HEADER_HEIGHT} />

        <Box
          component="main"
          sx={{
            pt: `${HEADER_HEIGHT + 24}px`,
            px: 3,
            pb: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
