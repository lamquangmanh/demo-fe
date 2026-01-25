import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';

export const DASHBOARD_PATH = '/dashboard';

export const LOGIN_PATH = '/auth/login';
export const AUTH_PATH = '/auth';
export const AUTH_FORGOT_PASSWORD_PATH = '/auth/forgot-password';

// User profile path
export const USER_PROFILE_PATH = '/user/profile';

// IAM paths
export const IAM_USERS_PATH = '/iam/users';
export const IAM_ROLES_PATH = '/iam/roles';
export const IAM_RESOURCES_PATH = '/iam/resources';
export const IAM_MODULES_PATH = '/iam/modules';
export const IAM_PRODUCTS_PATH = '/iam/products';

export const ROUTES = [
  {
    path: DASHBOARD_PATH,
    name: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: LOGIN_PATH,
    name: 'IAM',
    icon: <SettingOutlined />,
    children: [
      { path: IAM_USERS_PATH, name: 'Users' },
      { path: IAM_ROLES_PATH, name: 'Roles' },
      { path: IAM_RESOURCES_PATH, name: 'Resources' },
      { path: IAM_MODULES_PATH, name: 'Modules' },
      { path: IAM_PRODUCTS_PATH, name: 'Products' },
    ],
  },
];
