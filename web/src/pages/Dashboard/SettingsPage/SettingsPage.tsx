import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

export const SettingsPage = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Logout
      </Button>
    </div>
  );
};
