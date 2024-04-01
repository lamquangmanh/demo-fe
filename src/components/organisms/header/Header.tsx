import React, { useEffect, useState } from 'react';
import {
  Button,
  Switch,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BsSunFill,
} from '@/components/atoms';
import { BsSun } from '@/components/atoms';

type Prop = {
  hanldeCollapsed: () => void;
  collapsed: boolean;
};

export default function Header({ hanldeCollapsed, collapsed }: Prop) {
  const [darkmode, setDarkmode] = useState<boolean>(true);

  useEffect(() => {
    const item = localStorage.getItem('theme');
    setDarkmode(item === 'dark');
  }, []);

  useEffect(() => {
    if (darkmode) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }, [darkmode]);

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
      <Switch
        onClick={setDarkmode}
        checked={darkmode}
        checkedChildren={<BsSun className="mt-[2px]" size={16} color="#fff"></BsSun>}
        unCheckedChildren={<BsSunFill className="mt-[7px]" size={16} color="#172b4d"></BsSunFill>}
        defaultChecked
      />
    </div>
  );
}
