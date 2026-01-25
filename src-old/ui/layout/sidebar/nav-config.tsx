// ui/layout/sidebar/nav-config.ts
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

export const NAV_ITEMS = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <PeopleIcon fontSize="small" />,
  },
];
