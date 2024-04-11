import { useState } from 'react';
import {
  createUserService,
  deleteUserService,
  getListUserService,
  updateUserService,
} from '../services';
import { AddUserDto, UpdateUserDto, User } from '@/common/adapters/graphQL/gql/graphql';
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

  const apiCreateUser = async (body: AddUserDto) => {
    const responeData = await createUserService(body);
    setDataListUser([...dataListUser, responeData]);
  };

  const apiUpdateUser = async (body: UpdateUserDto) => {
    const responseData = await updateUserService(body);
    // handle update
    setDataListUser([...dataListUser]);
  };

  const apiDeleteUser = async (id: number) => {
    const responeData = await deleteUserService(id);
    setDataListUser(dataListUser.filter((id) => id !== id));
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
    apiDeleteUser,
  };
};
