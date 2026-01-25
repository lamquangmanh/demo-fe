'use client';

import { Skeleton } from 'antd';
import React from 'react';

const Loading = () => {
  return <Skeleton active paragraph={{ rows: 15 }} loading title />;
};

export default Loading;
