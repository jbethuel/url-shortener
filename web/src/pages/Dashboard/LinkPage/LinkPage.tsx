import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useLinkForm } from '../../../hooks/useLinkForm';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../../config/api';

export function LinkPage() {
  const { id } = useParams<{ id: string }>();

  const getLinkQuery = api.getLink({ linkId: id ?? '' });
  const patchLinkQuery = api.patchLink({ linkId: id ?? '' });

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

  const { formElements } = useLinkForm({
    initialValues: data,
    submitLabel: 'Update Link',
    onSubmit: (params) => {
      if (isLoading) return;
      patchLink({ path: params.path, url: params.url });
    },
  });

  return <Fragment>{formElements}</Fragment>;
}
