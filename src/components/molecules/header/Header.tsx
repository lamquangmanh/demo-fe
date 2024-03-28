import React, { useState } from 'react';
import { Layout, Button, Switch, MenuUnfoldOutlined, MenuFoldOutlined, Header } from '@/components';

type Prop = {
  hanldeCollapsed: () => void;
  collapsed: boolean;
};

export function HeaderComponent({ hanldeCollapsed, collapsed }: Prop) {
  return (
    <Header className="flex items-center justify-between bg-[#f5f5f5] p-0">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={hanldeCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Switch checkedChildren={'qwe'} unCheckedChildren="关闭" defaultChecked />
    </Header>
  );
}
