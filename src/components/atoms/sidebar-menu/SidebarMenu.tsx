import { Menu } from '@/components';
import { useMenu } from '@/common/hooks';

export const SidebarMenu = () => {
  const { items, defaultOpenKeys, selectedKeys } = useMenu();

  return (
    <>
      <Menu
        className="pt-10"
        mode="inline"
        items={items}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys}
        theme="light"
      />
    </>
  );
};
