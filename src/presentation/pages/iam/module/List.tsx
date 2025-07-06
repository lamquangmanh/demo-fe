'use client';

import React, { useRef, useState } from 'react';
import { Typography, Button } from 'antd';
import type { FormInstance } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { ModuleEntity } from '@/domain/entities';
// interface User {
//   key: string;
//   name: string;
//   email: string;
//   role: string;
// }

// const dummyData: User[] = [
//   {
//     key: '1',
//     name: 'Alice Johnson',
//     email: 'alice@example.com',
//     role: 'Admin',
//   },
//   { key: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
//   {
//     key: '3',
//     name: 'Charlie Rose',
//     email: 'charlie@example.com',
//     role: 'User',
//   },
//   {
//     key: '4',
//     name: 'David Lee',
//     email: 'david@example.com',
//     role: 'Moderator',
//   },
//   { key: '5', name: 'Emma Brown', email: 'emma@example.com', role: 'User' },
// ];

// const mockUsers = Array.from({ length: 57 }, (_, i) => ({
//   key: i,
//   name: `User ${i + 1}`,
//   email: `user${i + 1}@example.com`,
//   role: 'Moderator',
// }));

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// // Mock data fetcher
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const fetchData = async (params: any) => {
//   await sleep(5000); // simulate 5s delay

//   // Simulate backend filtering
//   const { name, email, current = 1, pageSize = 10 } = params;
//   const filteredData = mockUsers.filter(
//     (user) =>
//       (!name || user.name.includes(name)) &&
//       (!email || user.email.includes(email))
//   );

//   const start = (current - 1) * pageSize;
//   const end = start + pageSize;

//   return {
//     data: filteredData.slice(start, end),
//     total: filteredData.length,
//     success: true,
//   };
// };

const ListModule = () => {
  const actionRef = useRef<ActionType | null>(null);
  const formRef = useRef<FormInstance | undefined>(undefined);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
  });

  // const [selectedUser, setSelectedUser] = useState<ModuleEntity | null>(null);
  // const [open, setOpen] = useState(false);

  // const handleView = (user: ModuleEntity) => {
  //   // setSelectedUser(user);
  //   // setOpen(true);
  // };

  // const handleUpdate = (values: Partial<ModuleEntity>) => {
  //   setDataSource((prev) =>
  //     prev.map((user) =>
  //       user.id === selectedUser?.id ? { ...user, ...values } : user
  //     )
  //   );
  //   // setOpen(false);
  // };

  const columns: ProColumns<ModuleEntity>[] = [
    {
      title: 'Id',
      dataIndex: 'moduleId',
      width: 80,
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: 'Created User',
      dataIndex: 'createdUser.username',
      valueType: 'text',
      search: false,
      render: (text, record) => record.createdUser?.username || 'N/A',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: 'Updated User',
      dataIndex: 'updatedUser.username',
      valueType: 'text',
      search: false,
      render: (text, record) => record.updatedUser?.username || 'N/A',
    },
    {
      title: 'Action',
      key: 'action',
      search: false,
      render: () => <Button type="primary">Edit</Button>,
    },
  ];

  return (
    <>
      <Typography.Title level={3}>Module Management</Typography.Title>
      <ProTable<ModuleEntity>
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="key"
        search={{
          labelWidth: 'auto',
          // optionRender: (searchConfig, formProps, dom) => [
          optionRender: (searchConfig) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                searchConfig.form?.submit();
              }}
            >
              Search
            </Button>,
            <Button
              key="reset"
              onClick={() => {
                searchConfig.form?.resetFields();
                searchConfig.form?.submit(); // Trigger search after reset
              }}
            >
              Reset
            </Button>,
          ],
        }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });

            // Reset to page 1
            actionRef.current?.reloadAndRest?.();
          },
        }}
        // request={fetchData}
        // request={async (params) => {
        //   const { name, email, role } = params;

        //   const filtered = dummyData.filter((user) => {
        //     const matchesName = name
        //       ? user.name.toLowerCase().includes(name.toLowerCase())
        //       : true;
        //     const matchesEmail = email
        //       ? user.email.toLowerCase().includes(email.toLowerCase())
        //       : true;
        //     const matchesRole = role ? user.role === role : true;
        //     return matchesName && matchesEmail && matchesRole;
        //   });

        //   return {
        //     data: filtered,
        //     success: true,
        //     total: filtered.length,
        //   };
        // }}
        dateFormatter="string"
        // headerTitle="Module Management"
      />
    </>
  );
};

export default ListModule;
