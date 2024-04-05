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
  const apiGetListUser = async () => {
    const { data } = await getListUserService({
      pageSize: 10,
      page: 1,
    });
    setDataListUser(data || []);
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
