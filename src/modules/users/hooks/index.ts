import { useMutation } from '@tanstack/react-query';
import { createUserService, getListUserService } from '../services';
import { useState } from 'react';

const useGetListUser = ({
  onSuccess,
  onFailed,
}: {
  onSuccess?: (data: any) => void;
  onFailed?: (error: any) => void;
}) => {
  const mutation = useMutation({
    mutationFn: getListUserService,
    onSuccess: (response) => {
      onSuccess && onSuccess(response);
    },
    onError: onFailed,
  });

  return mutation;
};

const useCreateUser = ({
  onSuccess,
  onFailed,
}: {
  onSuccess?: (data: any) => void;
  onFailed?: (error: any) => void;
}) => {
  const mutation = useMutation({
    mutationFn: createUserService,
    onSuccess: (response) => {
      onSuccess && onSuccess(response);
    },
    onError: onFailed,
  });

  return mutation;
};

const useUser = () => {
  const [dataListUser, setDataListUser] = useState([]);
  const apiGetListUser = useGetListUser({
    onSuccess: (data) => {
      try {
        setDataListUser(data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return {
    /**
     * states
     */
    dataListUser,
    /**
     * functions
     */
    apiGetListUser,
  };
};

export { useUser };
