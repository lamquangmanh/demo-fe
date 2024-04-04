import { useState } from 'react';
import { createUserService, getListUserService, updateUserService } from '../services';
import { User } from '@/modules/users/models';

export const useUser = () => {
  const [dataListUser, setDataListUser] = useState<User[]>([]);
  const apiGetListUser = async () => {
    const responseData = await getListUserService();
    setDataListUser(responseData || []);
  };

  const apiCreateUser = async (param: User) => {
    const responseData = await createUserService(param);
    // setDataListUser(responseData || []);
  };

  const apiUpdateUser = async (param: User) => {
    const responseData = await updateUserService(param);
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
