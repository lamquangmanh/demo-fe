// ui/layout/sidebar/Sidebar.tsx
'use client';

import { Box, Typography, Stack } from '@mui/material';
import { NavItem } from './SidebarItem';
import { NAV_ITEMS } from './nav-config';

export function Sidebar({ width }: { width: number }) {
  return (
    <Box
      position="fixed"
      width={width}
      height="100vh"
      bgcolor="background.paper"
      borderRight="1px solid"
      borderColor="divider"
      px={2}
      py={3}
    >
      <Typography fontWeight={700} fontSize={20} mb={4}>
        Materio
      </Typography>

      <Stack spacing={1}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </Stack>
    </Box>
  );
}
