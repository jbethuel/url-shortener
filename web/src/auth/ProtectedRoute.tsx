import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosConfig } from '../config/axios';

export const ProtectedRoute = (props: { children: ReactElement | ReactElement[] }) => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const { isLoading: isLoadingAccessToken } = useQuery({
    queryKey: ['accesstoken'],
    queryFn: async () => {
      const result = await getAccessTokenSilently();
      axiosConfig.setBearerToken(result);

      return result;
    },
  });

  if (isLoading || isLoadingAccessToken) {
    return <div>loading..</div>;
  }

  if (!isLoading && !user) {
    return <Navigate to="/" />;
  }

  return props.children;
};
