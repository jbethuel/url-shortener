import { z } from 'zod';

export const linkSchema = z.object({
  id: z.string().uuid(),
  path: z
    .string({
      required_error: 'Path is required',
    })
    .min(1)
    .regex(/^[a-zA-Z0-9-]+$/, 'Should only contain A-Z, a-z, and hypen (-)'),
  url: z.string().url(),
});

export type Link = z.infer<typeof linkSchema>;

export function parseZodError(e: unknown) {
  if (e instanceof z.ZodError) {
    return e.issues.map((e) => e.message).join();
  }

  return 'Unknown error';
}
