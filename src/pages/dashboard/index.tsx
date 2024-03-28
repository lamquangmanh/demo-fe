import { ProtectedLayout } from '@/layouts';
import { ReactElement } from 'react';

export default function Page() {
  return <div className="text-2xl font-bold">Dashboard</div>;
}
Page.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
