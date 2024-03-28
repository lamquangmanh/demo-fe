import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu } from '@/interfaces';
import { ROUTE_MAP, ROUTE_NAME } from '../constant';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

type GetItem = {
  label: React.ReactNode | any;
  key?: React.Key | null;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'group';
};

const getItem = ({ label, key, icon, children, type }: GetItem): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

export const useMenu = () => {
  const { pathname } = useRouter();

  const pathsplit = pathname.split('/') as string[];

  const defaultOpenKeys = [pathsplit[1]];
  const selectedKeys = [...pathsplit.slice(1)];

  const items = ROUTE_MAP.map((parent: Menu) => {
    const Icon = parent.icon as React.ElementType<any> | undefined;
    const children = parent?.children?.map((item) =>
      getItem({
        key: item.key,
        label: (
          <Link passHref href={`/${parent.key}/${item.key}`}>
            {ROUTE_NAME[item.key]}
          </Link>
        ),
      }),
    );
    return getItem({
      label: (
        <Link passHref href={`/${parent.key}`}>
          {ROUTE_NAME[parent.key]}
        </Link>
      ),
      key: parent.key,
      icon: Icon ? <Icon /> : null,
      children,
    });
  });
  return {
    items,
    defaultOpenKeys,
    selectedKeys,
  };
};
