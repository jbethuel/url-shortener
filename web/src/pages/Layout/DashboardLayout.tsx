import { useAuth0 } from '@auth0/auth0-react';
import {
  AppShell,
  Aside,
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
  const { logout, user } = useAuth0();
  const location = useLocation();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  if (removeForwardSlash(location.pathname) === removeForwardSlash(routes.dashboard)) {
    return <Navigate to={routes.dashboardHome} />;
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Link to={routes.dashboardHome} style={{ color: theme.black, textDecoration: 'none' }}>
            <Box>Home</Box>
          </Link>
          <Link
            to={routes.dashboardSettings}
            style={{ color: theme.black, textDecoration: 'none' }}
          >
            <Box>Settings</Box>
          </Link>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md" onClick={() => logout()}>
          Logged in as {user?.email}
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                // mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};
