import { Box, Button, Flex, Loader, Pagination, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../config/api';
import { routes } from '../../../config/routes';

export const LinksPage = () => {
  const query = api.getLinkList();

  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useQuery({
    queryKey: [...query.key, page],
    queryFn: (context) => query.fn({ page: context.queryKey[1] as number }),
  });

  return (
    <Fragment>
      <Box sx={{ height: 'calc(100vh - 15rem)', overflowX: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>path</th>
              <th>url</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td align="center" colSpan={3}>
                  <Loader color="blue" />
                </td>
              </tr>
            ) : null}
            {data?.links.map((each) => (
              <tr
                key={each.id}
                onClick={() =>
                  navigate(
                    routes.dashboardLinkView.parsePath({
                      params: { id: each.id },
                      query: undefined,
                    }),
                  )
                }
              >
                <td>{each.id}</td>
                <td>{each.path}</td>
                <td>{each.url}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <Flex direction="row" sx={{ marginTop: 20 }} gap="md">
        <Button
          onClick={() =>
            navigate(routes.dashboardLinkCreate.parsePath({ params: undefined, query: undefined }))
          }
        >
          Create
        </Button>
        <Pagination
          total={Math.ceil((data?.total ?? 0) / 50)}
          value={page}
          onChange={(value) => setPage(value)}
        />
      </Flex>
    </Fragment>
  );
};
