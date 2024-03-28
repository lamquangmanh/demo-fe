import React, { useState } from 'react';
import { Layout } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { SidebarMenu } from '@/components/molecules';

const { Sider, Content } = Layout;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout className="h-full">
        <Sider
          width={200}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="h-screen !bg-white"
        >
          <SidebarMenu></SidebarMenu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Header hanldeCollapsed={handleCollapsed} collapsed={collapsed}></Header>

          <Content
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
