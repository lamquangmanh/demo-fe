// import from presentation
import { ForgotPasswordPage } from '@/presentation/pages/auth';

// Server Action Imports
import { getServerMode } from '@ui/core/utils/serverHelpers';

export default async function ForgotPassword() {
  const mode = await getServerMode();
  return <ForgotPasswordPage mode={mode} />;
}
