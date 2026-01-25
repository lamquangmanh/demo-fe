// ui/layout/header/Header.tsx
'use client';

import { Box, Typography, Stack } from '@mui/material';

export function Header({ height }: { height: number }) {
  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      left={260}
      height={height}
      bgcolor="background.paper"
      borderBottom="1px solid"
      borderColor="divider"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      zIndex={1100}
    >
      <Typography fontWeight={600}>Dashboard</Typography>

      <Stack direction="row" spacing={2}>
        {/* actions / avatar */}
      </Stack>
    </Box>
  );
}
