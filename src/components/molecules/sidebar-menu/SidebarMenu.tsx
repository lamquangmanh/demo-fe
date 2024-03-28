import { Menu } from '@/components/atoms';
import { useMenu } from '@/common/hooks';

const SidebarMenu = () => {
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

export default SidebarMenu;
