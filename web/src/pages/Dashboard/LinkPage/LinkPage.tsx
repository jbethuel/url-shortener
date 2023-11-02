import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useLinkForm } from '../../../hooks/useLinkForm';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../config/api';

export function LinkPage() {
  const { id } = useParams<{ id: string }>();
  const query = api.getLinkItem({ linkId: id ?? '' });

  const { data } = useQuery({
    queryKey: query.key,
    queryFn: query.fn,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });

  const { formElements } = useLinkForm({
    initialValues: data,
    onSubmit: (params) => {
      console.log('params', params);
      //
    },
  });

  return <Fragment>{formElements}</Fragment>;
}
