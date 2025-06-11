// import from infrastructure
import { SuperMenu } from '@/infrastructure/graphql/generated';

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
