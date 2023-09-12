import { useQuery } from '@tanstack/react-query';
import { api } from '../../../config/api';

export const LinksPage = () => {
  const query = api.getLinkList();
  const { data } = useQuery({ queryKey: query.key, queryFn: query.fn });

  return (
    <div>
      Links Page <br />
      {JSON.stringify(data, null, 1)}
    </div>
  );
};
