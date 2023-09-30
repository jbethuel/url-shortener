import { Box, Button, Flex, Loader, Modal, Pagination, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { api } from '../../../config/api';
import { LinksCreate } from './LinksCreate';

export const LinksPage = () => {
  const query = api.getLinkList();

  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useQuery({
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
              <tr key={each.id}>
                <td>{each.id}</td>
                <td>{each.path}</td>
                <td>{each.url}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal opened={opened} onClose={close} title="Create" centered>
          <LinksCreate
            onSuccess={() => {
              refetch();
              close();
            }}
          />
        </Modal>
      </Box>
      <Flex direction="row" sx={{ marginTop: 20 }} gap="md">
        <Button onClick={open}>Create</Button>
        <Pagination
          total={Math.ceil((data?.total ?? 0) / 50)}
          value={page}
          onChange={(value) => setPage(value)}
        />
      </Flex>
    </Fragment>
  );
};
