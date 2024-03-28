import {
  DashboardOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
} from '@/components/atoms/icons';
const PATH_NAME = {
  dashboard: 'dashboard',
  example1: 'example1',
  example2: 'example2',
  example3: 'example3',
  example4: 'example4',
  example5: 'example5',
};

export const ROUTE_TITLE_PAGE = {
  [PATH_NAME.dashboard]: 'Dashboard',
  [PATH_NAME.example1]: 'example1',
  [PATH_NAME.example2]: 'example2',
  [PATH_NAME.example3]: 'example3',
  [PATH_NAME.example4]: 'example4',
  [PATH_NAME.example5]: 'example5',
};

export const ROUTE_NAME = {
  [PATH_NAME.dashboard]: 'Dashboard',
  [PATH_NAME.example1]: 'Example1',
  [PATH_NAME.example2]: 'Example2',
  [PATH_NAME.example3]: 'Example3',
  [PATH_NAME.example4]: 'Example4',
  [PATH_NAME.example5]: 'Example5',
};

export const ROUTE_MAP = [
  {
    key: PATH_NAME.dashboard,
    path: PATH_NAME.dashboard,
    icon: DashboardOutlined,
  },
  {
    key: PATH_NAME.example1,
    path: PATH_NAME.example1,
    icon: CloudOutlined,
    disabled: true,
  },
  {
    key: PATH_NAME.example2,
    path: PATH_NAME.example2,
    disabled: true,
    icon: ShopOutlined,
  },
  {
    key: PATH_NAME.example3,
    path: PATH_NAME.example3,
    disabled: true,
    icon: TeamOutlined,
  },
  {
    key: PATH_NAME.example4,
    path: PATH_NAME.example4,
    disabled: true,
    icon: UserOutlined,
  },
  {
    key: PATH_NAME.example5,
    path: PATH_NAME.example5,
    disabled: true,
    icon: UploadOutlined,
  },
];
