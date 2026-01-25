// import from presentation
import { LoginPage } from '@/presentation/pages/auth';

// Server Action Imports
import { getServerMode } from '@ui/core/utils/serverHelpers';

export default async function Login() {
  const mode = await getServerMode();
  return <LoginPage mode={mode} />;
}
