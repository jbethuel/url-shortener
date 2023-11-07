import { Fragment } from 'react';
import { useLinkForm } from '../../../hooks/useLinkForm';
import { api } from '../../../config/api';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { LoadingOverlay } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/routes';

export function LinkCreatePage() {
  const navigate = useNavigate();
  const query = api.createLink();
  const { mutateAsync: sendRequest, isLoading } = useMutation({
    mutationKey: query.key,
    mutationFn: query.fn,
    onError: (error) => notifications.show({ message: `Error occured: ${error}` }),
    onSuccess: (newLink) => {
      notifications.show({ message: `New link created ${newLink.id}` });
      navigate(
        routes.dashboardLinkView.parsePath({ params: { id: newLink.id }, query: undefined }),
      );
    },
  });

  const { formElements } = useLinkForm({
    onSubmit: (values) => sendRequest(values),
  });

  return (
    <Fragment>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {formElements}
    </Fragment>
  );
}
