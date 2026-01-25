// Type Imports
import type { ChildrenType, Direction } from '@ui/core/types';

// Context Imports
import { VerticalNavProvider } from '@ui/menu/contexts/verticalNavContext';
import { SettingsProvider } from '@ui/core/contexts/settingsContext';
import ThemeProvider from '@ui/components/theme';

// Util Imports
import { getMode, getSettingsFromCookie } from '@ui/core/utils/serverHelpers';

type Props = ChildrenType & {
  direction: Direction;
};

const Providers = (props: Props) => {
  // Props
  const { children, direction } = props;

  // Vars
  const mode = getMode();
  const settingsCookie = getSettingsFromCookie();

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>{children}</ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  );
};

export default Providers;
