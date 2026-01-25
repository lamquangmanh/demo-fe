// Type Imports
import type { ChildrenType } from '@ui/core/types';

// Component Imports
import Providers from '@ui/components/Providers';
import BlankLayout from '@ui/layouts/BlankLayout';

const Layout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr';

  return (
    <Providers direction={direction}>
      <BlankLayout>{children}</BlankLayout>
    </Providers>
  );
};

export default Layout;
