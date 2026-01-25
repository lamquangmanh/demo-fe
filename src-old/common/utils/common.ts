// import form libs
import { FormInstance } from 'antd';

// import from infrastructure
import { SuperMenu } from '@/infrastructure/graphql/generated';
import { FilterArgs, SortArgs, SortOrder } from '@/infrastructure/graphql';
import i18n from '@/infrastructure/i18n/i18n';

// import from common
import {
  IAppList,
  GraphQLError,
  GraphQLErrorData,
  GraphQLErrorDataField,
} from '@/common/interfaces';
import { ERROR_LIST } from '@/common/constants';

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
      if (!key || value === undefined || value === null || value === '') return;
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

const parseIntByList = (list: (string | number)[]): (string | number)[] => {
  return list.map((item) => {
    if (typeof item === 'string' && !isNaN(parseInt(item))) {
      return parseInt(item);
    }
    return item;
  });
};

/**
 * Mapping error to form. return true if error and else return false
 * @param form
 * @param error
 * @returns
 */
export const mappingErrorToForm = (
  form: FormInstance,
  error: GraphQLError
): { hasError: boolean; errorsOutOfForm: GraphQLErrorDataField[] } => {
  const errors: GraphQLErrorData[] =
    error?.errors || error?.graphQLErrors || [];

  const errorsOutOfForm: GraphQLErrorDataField[] = [];

  // handle errors
  if (errors.length > 0) {
    for (const err of errors) {
      if (!err.extra?.fields) continue;

      for (const fieldItem of err.extra.fields) {
        const key = parseIntByList(fieldItem.field.split('.'));
        const formValue = form.getFieldValue(key);
        if (formValue) {
          // set error to form field
          form.setFields([
            { name: key, errors: [getErrorMessageByCode(fieldItem.code)] },
          ]);
        } else errorsOutOfForm.push(fieldItem);
      }
    }
    return { hasError: true, errorsOutOfForm };
  }

  return { hasError: false, errorsOutOfForm };
};

/**
 * Get error message by code
 * @param code
 * @returns
 */
export const getErrorMessageByCode = (code: number): string => {
  const error = ERROR_LIST.find((err) => err.code === code);
  if (error) {
    return i18n.t(error.error, { ns: 'error' });
  }
  return i18n.t('unknown', { ns: 'error' });
};
