import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Dashboard/HomePage';
import { SettingsPage } from './pages/Dashboard/SettingsPage';
import { DashboardLayout } from './pages/Layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './auth/ProtectedRoute';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<HomePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
