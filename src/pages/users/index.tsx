import { ProtectedLayout } from '@/layouts';
import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { Space, Table, Tag, Dropdown, Input } from 'antd';
import { EllipsisOutlined } from '@/components/atoms';
import type { TableProps } from '@/components/atoms';
import { useUser } from '@/modules/users/hooks/useUser';
import { User } from '@/common/adapters/graphQL/gql/graphql';
// import { User } from '@/modules/users/models';

export default function UserManagement() {
  // Translation hook
  const { t } = useTranslation('common');

  // States
  const [searchText, setSearchText] = useState<string>('');

  const { apiGetListUser, setDataListUser, dataLisstUser } = useUser();

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
    {
      title: t('EMAIL'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('ADDRESS'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown menu={{ items }}>
            <a className="text-xl">
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Search function
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    const filteredData = dataLisstUser.filter((item) =>
      item.name.toLowerCase().includes(searchValue),
    );
    setDataListUser(filteredData);
  }, []);

  useEffect(() => {
    apiGetListUser();
  }, []);

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
        <Table
          dataSource={dataLisstUser}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            total: dataLisstUser.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>
    </>
  );
}

UserManagement.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'header', 'menu'])),
  },
});
