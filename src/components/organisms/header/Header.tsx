import React from 'react';
import { Button, Switch, MenuUnfoldOutlined, MenuFoldOutlined } from '@/components/atoms';

type Prop = {
  hanldeCollapsed: () => void;
  collapsed: boolean;
};

export default function Header({ hanldeCollapsed, collapsed }: Prop) {
  return (
    <div className="flex items-center justify-between bg-[#f5f5f5] p-0">
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
    </div>
  );
}
