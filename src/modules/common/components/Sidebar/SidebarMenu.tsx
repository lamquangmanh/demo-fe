import { Menu } from '@/modules/common/components/ui';
import { useMenu } from '@/modules/common/hooks/useMenu';

export const SidebarMenu = () => {
  const { items, defaultOpenKeys, selectedKeys } = useMenu();

  return (
    <Menu
      mode="inline"
      items={items}
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={selectedKeys}
      theme="light"
    />
  );
};
