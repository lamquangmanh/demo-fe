import { useState } from 'react';
import { createUserService, getListUserService } from '../services';
import { User } from '@/common/adapters/graphQL/gql/graphql';
// import { User } from '@/modules/users/models';

export const useUser = () => {
  const [dataListUser, setDataListUser] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const apiGetListUser = async (
    pageSize: number,
    page: number,
    searchText?: string,
    sortType?: string,
  ) => {
    const { data, total } = await getListUserService({
      name: searchText,
      pageSize: pageSize,
      page: page,
      sort: sortType,
    });
    setDataListUser(data || []);
    setTotalUsers(total || 0);
  };

  const apiCreateUser = async (param: User) => {
    //const responseData = await createUserService(param);
    //setDataListUser(responseData);
  };

  const apiUpdateUser = async (param: User) => {
    // const responseData = await updateUserService(param);
    // setDataListUser(responseData || []);
  };
  return {
    /**
     * states
     */
    dataListUser,
    totalUsers,
    /**
     * functions
     */
    setDataListUser,
    apiGetListUser,
    apiCreateUser,
    apiUpdateUser,
  };
};
