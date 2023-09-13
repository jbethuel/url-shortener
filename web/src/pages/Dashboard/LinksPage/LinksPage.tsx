import { Box, Button, Loader, Modal, Pagination, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../config/api';
import { LinksCreate } from './LinksCreate';

export const LinksPage = () => {
  const query = api.getLinkList();
  const { data, isLoading, refetch } = useQuery({ queryKey: query.key, queryFn: query.fn });

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box sx={{ maxHeight: '100%' }}>
      <Box>
        <Text>Links</Text>
        <Button onClick={open}>Create</Button>
      </Box>
      {isLoading ? (
        <Box sx={{ marginTop: 10 }}>
          <Loader />
        </Box>
      ) : null}

      <Table sx={{ maxHeight: 'calc(100vh - 15rem)' }}>
        <thead>
          <tr>
            <th>id</th>
            <th>path</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((each) => (
            <tr key={each.id}>
              <td>{each.id}</td>
              <td>{each.path}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Box sx={{ marginTop: 20 }}>
        <Pagination total={10} />
      </Box>
      <Modal opened={opened} onClose={close} title="Create" centered>
        <LinksCreate onSuccess={refetch} />
      </Modal>
    </Box>
  );
};
