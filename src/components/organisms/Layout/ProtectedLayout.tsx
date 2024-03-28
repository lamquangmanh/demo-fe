import React, { useState } from 'react';
import { Layout, SidebarMenu, HeaderComponent, Content, Sider } from '@/components';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function ProtectedLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout className="min-h-screen">
        <Sider
          width={200}
          style={{ background: '#f5f5f5' }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <SidebarMenu></SidebarMenu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <HeaderComponent
            hanldeCollapsed={handleCollapsed}
            collapsed={collapsed}
          ></HeaderComponent>

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
