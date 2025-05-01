'use client';
import { ReactNode } from 'react';
import ProLayout from '@ant-design/pro-layout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout as AntLayout, Avatar, Dropdown, MenuProps } from 'antd';
import {
  GlobalOutlined,
  UserOutlined,
  SmileOutlined,
  KubernetesOutlined,
} from '@ant-design/icons';

// import from constants
import { ROUTES } from '@/constants';

// import from presentation
import { useComponentMounted } from '@/presentation/hooks';

type LayoutProps = {
  children: ReactNode;
};

const AuthorizedLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  // Prevent hydration mismatch
  const isMounted = useComponentMounted();
  if (!isMounted) return <div />;

  // define dropdown menu items of avatar and language
  const avatarDropdownMenu: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
    },
    {
      key: '2',
      label: 'Logout',
      icon: <SmileOutlined />,
    },
  ];

  const languageDropdownMenu: MenuProps['items'] = [
    {
      key: '1',
      label: 'English',
    },
    {
      key: '2',
      label: 'Tiếng Việt',
      icon: <SmileOutlined />,
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
              menu={{ items: avatarDropdownMenu }}
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
      // appList={[
      //   {
      //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      //     title: 'Ant Design',
      //     desc: 'Description ant design',
      //     url: 'https://ant.design',
      //   },
      //   {
      //     icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      //     title: 'AntV',
      //     desc: 'Description antv',
      //     url: 'https://antv.vision/',
      //     target: '_blank',
      //   },
      //   {
      //     icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
      //     title: 'Pro Components',
      //     desc: 'Description pro components',
      //     url: 'https://procomponents.ant.design/',
      //   },
      //   {
      //     icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
      //     title: 'umi',
      //     desc: 'Description umi',
      //     url: 'https://umijs.org/zh-CN/docs',
      //   },

      //   {
      //     icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
      //     title: 'Demo',
      //     desc: 'Description demo',
      //     url: 'https://qiankun.umijs.org/',
      //   },
      //   {
      //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      //     title: 'Demo',
      //     desc: 'Description demo',
      //     url: 'https://www.yuque.com/',
      //   },
      //   {
      //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
      //     title: 'Kitchen ',
      //     desc: 'Description Kitchen',
      //     url: 'https://kitchen.alipay.com/',
      //   },
      //   {
      //     icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
      //     title: 'dumi',
      //     desc: 'Description dumi',
      //     url: 'https://d.umijs.org/zh-CN',
      //   },
      // ]}
    >
      <AntLayout.Content
        style={{ padding: 24, minHeight: 'calc(100vh - 160px)' }}
      >
        {children}
      </AntLayout.Content>
    </ProLayout>
  );
};

export default AuthorizedLayout;
