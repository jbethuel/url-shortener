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
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <Auth0Provider
      domain={environmentVariables.auth0.domain}
      clientId={environmentVariables.auth0.clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}${routes.dashboard.path}`,
        audience: environmentVariables.auth0.audience,
        scope: environmentVariables.auth0.scope,
      }}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path={routes.root} element={<LoginPage />} />
              <Route
                path={routes.dashboard.path}
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index path={routes.dashboardHome.path} element={<HomePage />} />
                <Route path={routes.dashboardLinks.path} element={<LinksPage />} />
                <Route path={routes.dashboardSettings.path} element={<SettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </Auth0Provider>
  );
}
