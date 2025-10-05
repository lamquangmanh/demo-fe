// import from infrastructure
import { SuperMenu } from '@/infrastructure/graphql/generated';
import { FilterArgs, SortArgs, SortOrder } from '@/infrastructure/graphql';

// import from common
import { IAppList } from '@/common/interfaces';

export const getAppListFromSuperMenus = (superMenus: SuperMenu[]) => {
  const appList: IAppList[] = [];

  superMenus.forEach((item: SuperMenu) => {
    appList.push({
      title: item.name,
      desc: item.description ?? '',
      url: item.url ?? '',
      icon: undefined,
    });
  });

  return appList;
};

/**
 * Build sort arguments from sorter object.
 * @param sorter
 * @param emptyFilter add default filter if filters are empty
 * @returns
 */
export const buildSortArgs = (sorter: object, emptySort?: SortArgs) => {
  const sorts: SortArgs[] = [];
  if (sorter && Object.keys(sorter).length > 0) {
    Object.entries(sorter).forEach(([key, value]) => {
      if (value === 'ascend' || value === 'descend') {
        sorts.push({
          field: key,
          order: value === 'ascend' ? SortOrder.Asc : SortOrder.Desc,
        });
      }
    });
  }

  // add default filter if filters are empty
  if (sorts.length === 0 && emptySort) {
    sorts.push(emptySort);
  }
  return sorts;
};

/**
 * Build filter arguments from filter object.
 * @param filter
 * @returns
 */
export const buildFilterArgs = (filter: object): FilterArgs[] => {
  const filters: FilterArgs[] = [];

  if (filter && Object.keys(filter).length > 0) {
    Object.entries(filter).forEach(([key, value]) => {
      filters.push({
        field: key,
        value: value,
      });
    });
  }

  return filters;
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return localStorage.getItem(key);
  }
  return null;
};

export const removeLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return localStorage.removeItem(key);
  }
  return null;
};

// A mock function to mimic making an async request for data
export const mockFetchAPI = async <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};
