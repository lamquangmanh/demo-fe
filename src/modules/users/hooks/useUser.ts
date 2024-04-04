import { useState } from 'react';
import { getListUserService } from '../services';
import { User } from '@/modules/users/models';

export const useUser = () => {
  const [dataLisstUser, setDataListUser] = useState<User[]>([]);
  const apiGetListUser = async () => {
    const responseData = await getListUserService();
    console.log('-----------responseData', responseData);
    setDataListUser(responseData || []);
  };
  return {
    /**
     * states
     */
    dataLisstUser,
    /**
     * functions
     */
    apiGetListUser,
  };
};
