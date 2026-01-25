'use client';

// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type { ChildrenType } from '@ui/core/types';

// Util Imports
import { verticalLayoutClasses } from '@ui/layouts/utils/layoutClasses';

// Styled Component Imports
import StyledMain from '@ui/layouts/styles/shared/StyledMain';

const LayoutContent = ({ children }: ChildrenType) => {
  return (
    <StyledMain
      isContentCompact={true}
      className={classnames(
        verticalLayoutClasses.content,
        verticalLayoutClasses.contentCompact,
        'flex-auto is-full',
      )}
    >
      {children}
    </StyledMain>
  );
};

export default LayoutContent;
