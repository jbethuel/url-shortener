import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { environmentVariables } from './config/environmentVariables';
import { routes } from './config/routes';
import { HomePage } from './pages/Dashboard/HomePage';
import { SettingsPage } from './pages/Dashboard/SettingsPage';
import { DashboardLayout } from './pages/Layout';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  return (
    <Auth0Provider
      domain={environmentVariables.auth0.domain}
      clientId={environmentVariables.auth0.clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}${routes.dashboard}`,
      }}
    >
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
              <Route path={routes.dashboardSettings} element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Auth0Provider>
  );
}
