import { ProtectedLayout } from '@/layouts';
import { ReactElement } from 'react';

export default function Page() {
  return <div>Dashboard</div>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
