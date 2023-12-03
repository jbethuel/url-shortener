import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, ReactElement } from 'react';
import { Link, linkSchema, parseZodError } from '../models/Link';

export type useLinkFormParams = {
  submitLabel?: string;
  onSubmit: (params: Link) => void;
  mode: 'create' | 'edit';
  initialValues?: Link;
  customButtons?: ReactElement | ReactElement[];
};

export function useLinkForm(params: useLinkFormParams) {
  const { customButtons, onSubmit, submitLabel = 'Submit', initialValues } = params;

  const form = useForm<Link>({
    initialValues: {
      id: '',
      path: '',
      url: '',
    },

    validate: {
      id: () => null,
      path: (path) => {
        try {
          linkSchema.shape.path.parse(path);
          return null;
        } catch (e) {
          return parseZodError(e);
        }
      },
      url: (url) => {
        try {
          linkSchema.shape.url.parse(url);
          return null;
        } catch (e) {
          return parseZodError(e);
        }
      },
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
          {customButtons}
          <Button type="submit">{submitLabel}</Button>
        </Group>
      </form>
    ),
  };
}
