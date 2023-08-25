import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = (props: { children: ReactElement | ReactElement[] }) => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>loading..</div>;
  }

  if (!isLoading && !user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return props.children;
};
