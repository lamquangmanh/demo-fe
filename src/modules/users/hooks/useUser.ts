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
    console.log('22222222');
    const { data } = await getListUserService({
      pageSize: 10,
      page: 1,
    });
    console.log('datadatadatadatadata', data);
    setDataListUser(data || []);
  };

  const apiCreateUser = async (body: AddUserDto) => {
    await createUserService(body);
    // setDataListUser([...dataListUser, responeData]);
    await apiGetListUser();
  };

  const apiUpdateUser = async (body: UpdateUserDto) => {
    await updateUserService(body);
    await apiGetListUser();
  };

  const apiDeleteUser = async (id: number) => {
    await deleteUserService(id);
    console.log('------111111');
    await apiGetListUser();
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
