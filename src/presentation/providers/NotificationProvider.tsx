'use client';

import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

export const NotificationContext = createContext<ReturnType<
  typeof notification.useNotification
> | null>(null);

export const useNotificationApi = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      'useNotificationApi must be used within NotificationProvider'
    );
  return ctx;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={[api, contextHolder]}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
