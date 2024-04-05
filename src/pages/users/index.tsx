import { ProtectedLayout } from '@/layouts';
import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { Space, Table, Tag, Dropdown, Input, Modal, Button } from 'antd';
import { EllipsisOutlined } from '@/components/atoms';
import type { TableProps } from '@/components/atoms';
import { useUser } from '@/modules/users/hooks/useUser';
import { User } from '@/common/adapters/graphQL/gql/graphql';
// import { User } from '@/modules/users/models';
import UserModal from '@/modules/users/components/userModal';

export default function UserManagementPage() {
  // Translation hook
  const { t } = useTranslation('common');
  const {
    dataListUser,
    apiGetListUser,
    setDataListUser,
    apiCreateUser,
    apiUpdateUser,
    apiDeleteUser,
  } = useUser();
  // States
  const [searchText, setSearchText] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>();

  // Actions
  const items = [
    { key: '1', label: t('EDIT') },
    { key: '2', label: t('DELETE') },
  ];

  // Table columns
  const columns: TableProps<User>['columns'] = [
    {
      title: t('FULLNAME'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('USERNAME'),
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: t('EMAIL'),
    //   dataIndex: 'email',
    //   key: 'email',
    // },
    // {
    //   title: t('ADDRESS'),
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    // {
    //   title: t('TAGS'),
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              onClick: (e: any) => handleDropdownItemClick(record, e),
              items: items,
            }}
          >
            <a className="text-xl">
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Handle filter search
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    const filteredData = dataListUser.filter((item) =>
      item.name.toLowerCase().includes(searchValue),
    );
    setDataListUser(filteredData);
  }, []);

  useEffect(() => {
    apiGetListUser();
  }, []);

  // Actions with user rows
  const handleDropdownItemClick = (record: any, e: any) => {
    if (e.key === '1') {
      setIsEdit(true);
      setEditUser({ name: record.name, username: record.username });
      setIsUserModalOpen(true);
    } else {
      setIsDeleteOpen(true);
    }
  };

  // Handle delete user
  const handleDelete = () => {
    // graphql mutation
    setIsDeleteOpen(false);
    // apiDeleteUser(id)
  };

  // Handle create user
  const handleCreate = () => {
    setEditUser(null);
    setIsEdit(false);
    setIsUserModalOpen(true);
  };

  return (
    <>
      <div className="mb-5 text-2xl font-bold">
        <p>{t('USER_MANAGEMENT')}</p>
      </div>
      <div>
        <Input.Search
          className="mb-5"
          size="large"
          onChange={handleSearch}
          placeholder={t('SEARCH')}
          value={searchText}
        />
        <div className="mb-5 flex justify-end">
          <Button type="primary" style={{ background: '#f759ab' }} onClick={handleCreate}>
            {t('CREATE_USER')}
          </Button>
        </div>
        <Table
          dataSource={dataListUser}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            total: dataListUser.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>
      <Modal
        title={t('DELETE_USER')}
        open={isDeleteOpen}
        okText={t('DELETE')}
        onOk={handleDelete}
        okButtonProps={{ style: { backgroundColor: '#f759ab' } }}
        cancelText={t('CANCEL')}
        onCancel={() => setIsDeleteOpen(false)}
      >
        <p>{t('DELETE_MESSAGE')}</p>
      </Modal>
      {isUserModalOpen && (
        <UserModal
          isEdit={isEdit}
          isOpen={isUserModalOpen}
          setIsOpen={setIsUserModalOpen}
          userData={editUser}
          handleUpdate={apiUpdateUser}
          handleCreate={apiCreateUser}
        />
      )}
    </>
  );
}

UserManagementPage.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'header', 'menu'])),
  },
});
