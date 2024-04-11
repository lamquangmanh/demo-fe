import { ProtectedLayout } from '@/layouts';
import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { Space, Table, Tag, Dropdown, Input, Modal, Button } from 'antd';
import { EllipsisOutlined } from '@/components/atoms';
import type { TableProps } from '@/components/atoms';
import { useUser } from '@/modules/users/hooks/useUser';
import { useRouter } from 'next/router';
import UserModal from '@/modules/users/components/userModal';
import { User } from '@/common/adapters/graphQL/gql/graphql';
import { SortAscendingOutlined } from '@ant-design/icons';

export default function UserManagementPage() {
  // Translation hook
  const { t } = useTranslation('common');

  // Router
  const router = useRouter();

  const {
    dataListUser,
    apiGetListUser,
    setDataListUser,
    apiCreateUser,
    apiUpdateUser,
    apiDeleteUser,
    totalUsers,
  } = useUser();
  // States
  const [searchText, setSearchText] = useState<string>('');
  const [sort, setSort] = useState<string>('asc');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editUser, setEditUser] = useState<User>();

  // Get Users API
  useEffect(() => {
    // Retrieve page and pageSize from URL query parameters
    const { page: urlPage, pageSize: urlPageSize, sort: urlSort } = router.query;

    const parsedPage = parseInteger(urlPage, 1);
    const parsedPageSize = parseInteger(urlPageSize, 5);
    const parsedSort = urlSort ? urlSort.toString() : 'name.asc';

    setPage(parsedPage);
    setPageSize(parsedPageSize);
    setSort(parsedSort);

    console.log(router.query);

    // Fetch data using retrieved parameters
    apiGetListUser(parsedPageSize, parsedPage, searchText, parsedSort);
  }, [router.query, searchText]);

  // Function to parse integer from string, handling potential NaN values
  const parseInteger = (value: string | string[] | undefined, defaultValue: number) => {
    if (Array.isArray(value)) {
      value = value[0];
    }
    const parsedValue = parseInt(value as string, 10);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  };

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
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('USERNAME'),
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
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
  }, []);

  // Actions with user rows
  const handleDropdownItemClick = (record: User, e: any) => {
    if (e.key === '1') {
      setIsEdit(true);
      setEditUser(record);
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
    setEditUser(undefined);
    setIsEdit(false);
    setIsUserModalOpen(true);
  };

  // Handle pagination
  const handlePagination = (page: number, pageSize: number) => {
    router.push({
      pathname: '/users',
      query: { ...router.query, page: page, pageSize: pageSize },
    });
  };

  // Handle alphabet sort on name
  const handleSort = (pagination: any, order: any) => {
    const nextSort = order.order === 'descend' ? 'name.desc' : 'name.asc';
    router.push({
      pathname: '/users',
      query: { page: pagination.current, pageSize: pagination.pageSize, sort: nextSort },
    });
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
            pageSize: pageSize,
            current: page,
            total: totalUsers,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, pageSize) => handlePagination(page, pageSize),
          }}
          onChange={(pagination, sorter) => {
            if (sorter) {
              handleSort(pagination, sorter);
            }
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
