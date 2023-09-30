import {
  AppShell,
  Box,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';

const removeForwardSlash = (param: string) => {
  return param.replace(/\//g, '');
};

export const DashboardLayout = () => {
  const location = useLocation();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  if (removeForwardSlash(location.pathname) === removeForwardSlash(routes.dashboard.path)) {
    return <Navigate to={routes.dashboardHome.path} />;
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
            <Text>URL Shortener</Text>
          </div>
        </Header>
      }
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Link
            to={routes.dashboardHome.path}
            style={{ color: theme.black, textDecoration: 'none' }}
          >
            <Box>Home</Box>
          </Link>
          <Link
            to={routes.dashboardLinks.path}
            style={{ color: theme.black, textDecoration: 'none' }}
          >
            <Box>Links</Box>
          </Link>
          <Link
            to={routes.dashboardSettings.path}
            style={{ color: theme.black, textDecoration: 'none' }}
          >
            <Box>Settings</Box>
          </Link>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          {new Date().getFullYear()}
        </Footer>
      }
    >
      <Outlet />
    </AppShell>
  );
};
