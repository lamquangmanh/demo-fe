import { ProtectedLayout } from '@/layouts';
import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

export default function Page() {
  const { t } = useTranslation('common');

  return (
    <div className="text-2xl font-bold">
      <p> {t('DASHBOARD')}</p>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'header', 'menu'])),
  },
});
