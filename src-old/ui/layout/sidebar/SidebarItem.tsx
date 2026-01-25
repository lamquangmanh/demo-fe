// ui/layout/sidebar/SidebarItem.tsx
'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  title,
  path,
  icon,
}: {
  title: string;
  path: string;
  icon?: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <Box
      component={Link}
      href={path}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.25,
        borderRadius: 1.5,
        textDecoration: 'none',
        color: active ? 'primary.main' : 'text.primary',
        bgcolor: active ? 'primary.lighter' : 'transparent',
        fontWeight: active ? 600 : 400,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      {icon}
      <Typography variant="body2">{title}</Typography>
    </Box>
  );
}
