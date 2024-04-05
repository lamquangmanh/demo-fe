import { useState } from 'react';
import { createUserService, getListUserService } from '../services';
import { User } from '@/common/adapters/graphQL/gql/graphql';
// import { User } from '@/modules/users/models';

export const useUser = () => {
  const [dataListUser, setDataListUser] = useState<User[]>([]);
  const apiGetListUser = async () => {
    const { data } = await getListUserService({
      limit: 10,
      size: 1,
    });
    setDataListUser(data || []);
  };

  const apiCreateUser = async (param: User) => {
    // const responseData = await createUserService(param);
    // setDataListUser(responseData || []);
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
    /**
     * functions
     */
    setDataListUser,
    apiGetListUser,
    apiCreateUser,
    apiUpdateUser,
  };
};
