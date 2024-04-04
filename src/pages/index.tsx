import { GetStaticProps } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);
  return <></>;
}
// Page.getLayout = function getLayout(page: ReactElement) {
//   return <ProtectedLayout>{page}</ProtectedLayout>;
// };

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'header', 'menu'])),
  },
});
