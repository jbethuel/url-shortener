import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

export const SettingsPage = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};
