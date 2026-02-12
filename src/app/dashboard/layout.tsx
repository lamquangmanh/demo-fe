// Type Imports
import type { ChildrenType } from '@ui/core/types';

// Layout Imports
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import VerticalLayout from '@ui/layouts/VerticalLayout';

// Component Imports
import Providers from '@ui/components/Providers';
import Navigation from '@ui/components/layout/vertical/Navigation';
import Navbar from '@ui/components/layout/vertical/Navbar';
import VerticalFooter from '@ui/components/layout/vertical/Footer';

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr';

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout
            navigation={<Navigation />}
            navbar={<Navbar />}
            footer={<VerticalFooter />}
          >
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  );
};

export default Layout;
