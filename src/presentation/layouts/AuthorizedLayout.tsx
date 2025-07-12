'use client';

import { ReactNode, useEffect } from 'react';
import ProLayout from '@ant-design/pro-layout';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { Layout as AntLayout, Avatar, Dropdown, MenuProps } from 'antd';
import {
  GlobalOutlined,
  UserOutlined,
  SmileOutlined,
  KubernetesOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

// import from constants
import { ROUTES, USER_PROFILE_PATH, LOGIN_PATH } from '@/common/constants';

// import from presentation
import {
  useComponentMounted,
  useLogout,
  useSuperMenus,
} from '@/presentation/hooks';
// import from presentation/components
import { PageLoading } from '@/presentation/components/atoms';

// import from domain
import {
  useAuthStore,
  AuthState,
  useMenuStore,
  useLanguageStore,
} from '@/domain/stores';

type LayoutProps = {
  children: ReactNode;
};

const AuthorizedLayout = ({ children }: LayoutProps) => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const router = useRouter();
  const { handleLogout } = useLogout();
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated
  );

  // initialize language store
  const { setLanguage } = useLanguageStore();

  // initialize super menus from menu store
  // and fetch super menus from server if not already fetched
  // This is to ensure that the super menus are available for the layout
  const { superMenus, appList, isLoaded, setIsLoaded } = useMenuStore();
  const { getSuperMenuRequest } = useSuperMenus();

  // Check if user is authenticated, if not redirect to login page
  // This effect runs on the client side to ensure the user is authenticated
  // before rendering the layout
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(LOGIN_PATH);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // If superMenus are not fetched, fetch them
    if (!isLoaded) {
      getSuperMenuRequest();
      setIsLoaded(true);
    }
  }, [superMenus.length, isLoaded, setIsLoaded, getSuperMenuRequest]);

  // Prevent hydration mismatch
  const isMounted = useComponentMounted();
  if (!isMounted) return <PageLoading />;

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    // Show nothing (or a loader) while redirecting
    return <PageLoading />;
  }

  // define dropdown menu items of avatar and language
  const userDropdownMenu: MenuProps['items'] = [
    {
      key: '1',
      label: t('header.user.profile'),
      icon: <UserOutlined />,
      onClick: () => {
        // navigate to profile page
        router.push(USER_PROFILE_PATH);
      },
    },
    {
      key: '2',
      label: t('header.user.logout'),
      icon: <LogoutOutlined />,
      onClick: () => {
        // handle logout click
        handleLogout();
      },
    },
  ];

  const languageDropdownMenu: MenuProps['items'] = [
    {
      key: '1',
      label: t('header.language.en'),
      icon: <GlobalOutlined />,
      onClick: () => {
        // handle language change to English
        setLanguage('en');
      },
    },
    {
      key: '2',
      label: t('header.language.vi'),
      icon: <SmileOutlined />,
      onClick: () => {
        // handle language change to Vietnamese
        setLanguage('vi');
      },
    },
  ];

  return (
    <ProLayout
      title="Admin Panel"
      route={{ routes: ROUTES }}
      location={{ pathname }}
      logo={<KubernetesOutlined />}
      layout="mix"
      // splitMenus={false}
      menuItemRender={(item, dom) => <Link href={item.path || '#'}>{dom}</Link>}
      headerContentRender={() => (
        <div className="grid justify-items-end">
          <div>
            <Dropdown
              menu={{ items: languageDropdownMenu }}
              placement="bottomRight"
            >
              <GlobalOutlined
                size={24}
                style={{
                  fontSize: 24,
                  cursor: 'pointer',
                  marginRight: 15,
                }}
              />
            </Dropdown>

            <Dropdown
              menu={{ items: userDropdownMenu }}
              placement="bottomRight"
            >
              <Avatar
                size={28}
                icon={<UserOutlined />}
                style={{ cursor: 'pointer', marginRight: 10, marginTop: -10 }}
              />
            </Dropdown>
          </div>
        </div>
      )}
      appList={appList}
    >
      <AntLayout.Content>{children}</AntLayout.Content>
    </ProLayout>
  );
};

export default AuthorizedLayout;
