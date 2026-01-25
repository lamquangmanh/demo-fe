'use client';

// React Imports
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

interface LoadingScreenProps {
  text?: string;
  backgroundColor?: string;
  color?: string;
}

const PageLoading: React.FC<LoadingScreenProps> = ({
  text = 'Loading...',
  backgroundColor = 'gray',
  color = 'white',
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color,
        opacity: 0.7,
      }}
    >
      <Spin indicator={antIcon} size="large" />
      <div style={{ marginTop: 16, fontSize: 16 }}>{text}</div>
    </div>
  );
};
export { PageLoading };
export default PageLoading;
