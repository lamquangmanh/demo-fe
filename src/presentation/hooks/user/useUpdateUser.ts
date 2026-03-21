'use client';

// import from libraries
import { useCallback } from 'react';

// import from presentation/hooks
import { useNotify } from '../common';

// import from common
import { DEFAULT_ERROR } from '@/common/constants';
import { GraphQLError } from '@/common/interfaces';

// NOTE: UpdateUser mutation is commented out in client.graphql due to backend schema mismatch
// Backend only accepts updateUser(userId: String!) but frontend needs full update capability
// This is a temporary stub until backend API is updated

export interface UseUpdateUserProps {
  isNotifyError?: boolean; // default true
  isNotifySuccess?: boolean; // default true
}

export function useUpdateUser(props?: UseUpdateUserProps) {
  const isNotifyError = props?.isNotifyError ?? true;

  // initialize notify hook
  const notify = useNotify();

  const handleUpdateUserRequest = useCallback(async (): Promise<
    boolean | undefined | GraphQLError
  > => {
    try {
      // TODO: Implement when backend updateUser mutation is ready
      console.warn(
        'UpdateUser mutation not implemented - backend API mismatch',
      );

      if (isNotifyError) {
        notify.error({
          message: 'Update User Not Available',
          description: 'Backend API does not support full user updates yet',
        });
      }

      return false;
    } catch (error) {
      console.log('Network or unexpected error:', error);
      if (isNotifyError) notify.error(DEFAULT_ERROR.message);
      return error as GraphQLError;
    }
  }, [notify, isNotifyError]);

  return {
    handleUpdateUserRequest,
    loading: false,
    data: null,
    error: null,
    called: false,
  };
}
