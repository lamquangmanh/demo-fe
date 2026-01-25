'use client';
// import AppLayout from '../../ui/layout/AppLayout';
// import { UiProvider } from '../../ui/providers/UiProvider';

// export default function TestPage() {
//   return (
//     <UiProvider>
//       <AppLayout>
//         <div className="p-4">
//           <h1 className="text-2xl font-bold mb-4">Test Page</h1>
//           <p>This is a test page within the dashboard layout.</p>
//         </div>
//       </AppLayout>
//     </UiProvider>
//   );
// }

// export default function TestPage() {
//   return <Login mode="dark" />;
// }

// Component Imports
import Login from '@ui/views/Login';

// Server Action Imports
// import { getServerMode } from '@ui/core/utils/serverHelpers';

const LoginPage = () => {
  // Vars
  // const mode = getServerMode();

  return <Login mode={'dark'} />;
};

export default LoginPage;
