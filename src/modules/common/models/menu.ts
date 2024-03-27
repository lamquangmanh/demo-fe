export interface MenuItem {
  key: string;
}

export interface Menu {
  key: string;
  icon?: React.ElementType;
  path?: string;
  children?: MenuItem[];
}
