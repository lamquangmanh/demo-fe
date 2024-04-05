import { useState } from 'react';
import { createUserService, getListUserService } from '../services';
import { User } from '@/common/adapters/graphQL/gql/graphql';
// import { User } from '@/modules/users/models';

export const useUser = () => {
  const [dataListUser, setDataListUser] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const apiGetListUser = async () => {
    const { data, total } = await getListUserService({
      pageSize: 10,
      page: 1,
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
