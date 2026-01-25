// src/components/layout/Topbar.tsx
'use client';

import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar({ sidebarWidth }: { sidebarWidth: number }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end', gap: 2 }}>
        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <Avatar sx={{ width: 36, height: 36 }} />
      </Toolbar>
    </AppBar>
  );
}
