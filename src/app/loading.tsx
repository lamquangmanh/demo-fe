'use client';

import { Skeleton } from 'antd';
// import { Spin, Skeleton } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

// const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

const Loading = () => {
  // return (
  //   <div
  //     style={{
  //       height: '100vh',
  //       width: '100vw',
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       background: '#fff',
  //       zIndex: 9999,
  //       position: 'fixed',
  //       top: 0,
  //       left: 0,
  //     }}
  //   >
  //     <Spin
  //       indicator={antIcon}
  //       tip="Loading page..."
  //       size="large"
  //       style={{ maxHeight: '100%' }}
  //     >
  //       {/* antd requires children to render the tip properly */}
  //       <div style={{ padding: 24 }} />
  //     </Spin>
  //   </div>
  // );

  return <Skeleton active paragraph={{ rows: 15 }} loading title />;
};

export default Loading;
