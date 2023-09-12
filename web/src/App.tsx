import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { environmentVariables } from './config/environmentVariables';
import { queryClient } from './config/reactQuery';
import { routes } from './config/routes';
import { HomePage } from './pages/Dashboard/HomePage';
import { SettingsPage } from './pages/Dashboard/SettingsPage';
import { DashboardLayout } from './pages/Layout';
import { LoginPage } from './pages/LoginPage';
import { LinksPage } from './pages/Dashboard/LinksPage';

console.log('environmentVariables', environmentVariables);

export default function App() {
  return (
    <Auth0Provider
      domain={environmentVariables.auth0.domain}
      clientId={environmentVariables.auth0.clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}${routes.dashboard}`,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <Routes>
              <Route path={routes.root} element={<LoginPage />} />
              <Route
                path={routes.dashboard}
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index path={routes.dashboardHome} element={<HomePage />} />
                <Route path={routes.dashboardLinks} element={<LinksPage />} />
                <Route path={routes.dashboardSettings} element={<SettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
}
