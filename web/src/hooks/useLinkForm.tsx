import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { Link } from '../models/Link';

export type useLinkFormParams = {
  submitLabel?: string;
  onSubmit: (params: Link) => void;
  initialValues?: Link;
};

export function useLinkForm(params: useLinkFormParams) {
  const { onSubmit, submitLabel = 'Submit', initialValues } = params;

  const form = useForm<Link>({
    initialValues: {
      id: '',
      path: '',
      url: '',
    },

    validate: {
      id: () => null,
      path: (path) => (path ? null : 'Path is required'),
      url: (url) => (url ? null : 'Link is required'),
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
    // eslint-disable-next-line
  }, [initialValues]);

  return {
    formElements: (
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Path"
          placeholder="your-shortened-path"
          {...form.getInputProps('path')}
        />
        <TextInput
          withAsterisk
          label="URL"
          placeholder="https://google.com"
          {...form.getInputProps('url')}
        />
        <Group position="right" mt="md">
          <Button type="submit">{submitLabel}</Button>
        </Group>
      </form>
    ),
  };
}
