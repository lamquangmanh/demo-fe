import React, { useState } from 'react';

import {
  Layout,
  Button,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@/modules/common/components/ui';
import { Sidebar } from '@/modules/common/components/Sidebar';

const { Content, Sider, Header } = Layout;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function ProtectedLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

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
          <Sidebar></Sidebar>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Header className="header-custom">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
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
