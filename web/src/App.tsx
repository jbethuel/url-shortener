import { MantineProvider } from '@mantine/core';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Dashboard/HomePage';
import { LoginPage } from './pages/LoginPage';

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/dashboard/home',
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes />
    </MantineProvider>
  );
}
