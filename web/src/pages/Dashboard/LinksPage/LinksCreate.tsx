import { Box, Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../config/api';

export const LinksCreate = (props: { onSuccess: () => void }) => {
  const query = api.createNewLink();
  const { mutateAsync: sendRequest, isLoading } = useMutation({
    mutationKey: query.key,
    mutationFn: async (args: Parameters<typeof query.fn>[0]) => {
      const result = await query.fn(args);
      props.onSuccess();
      return result;
    },
    onError: (error) => notifications.show({ message: `Error occured: ${error}` }),
  });

  const form = useForm({
    initialValues: {
      path: '',
      link: '',
    },

    validate: {
      path: (path) => (path ? null : 'Path is required'),
      link: (link) => (link ? null : 'Link is required'),
    },
  });

  return (
    <Box mx="auto">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <form
        onSubmit={form.onSubmit((values) => sendRequest({ path: values.path, url: values.link }))}
      >
        <TextInput
          withAsterisk
          label="Path"
          placeholder="your-shortened-path"
          {...form.getInputProps('path')}
        />
        <TextInput
          withAsterisk
          label="Link"
          placeholder="https://google.com"
          {...form.getInputProps('link')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
