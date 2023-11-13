import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLinkForm } from '../../../hooks/useLinkForm';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../../config/api';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { routes } from '../../../config/routes';

export function LinkPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getLinkQuery = api.getLink({ linkId: id ?? '' });
  const patchLinkQuery = api.patchLink({ linkId: id ?? '' });
  const deleteLinkQuery = api.deleteLink({ linkId: id ?? '' });

  const { data, refetch, isLoading } = useQuery({
    queryKey: getLinkQuery.key,
    queryFn: getLinkQuery.fn,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });

  const { mutate: patchLink } = useMutation({
    mutationKey: patchLinkQuery.key,
    mutationFn: patchLinkQuery.fn,
    onSuccess: () => refetch(),
  });

  const { mutate: deletLink } = useMutation({
    mutationKey: deleteLinkQuery.key,
    mutationFn: deleteLinkQuery.fn,
    onSuccess: () => {
      notifications.show({ message: `New link deleted ${id}`, color: 'red' });
      navigate(routes.dashboardLinks.parsePath({ params: undefined, query: undefined }));
    },
  });

  const { formElements } = useLinkForm({
    initialValues: data,
    submitLabel: 'Update Link',
    customButtons: (
      <Button color="red" onClick={() => deletLink()}>
        Delete
      </Button>
    ),
    onSubmit: (params) => {
      if (isLoading) return;
      patchLink({ path: params.path, url: params.url });
    },
  });

  return <Fragment>{formElements}</Fragment>;
}
