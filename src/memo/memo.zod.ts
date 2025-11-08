import { z } from 'zod';

export const createMemoSchema = z
  .object({
    title: z.string().max(256),
    content: z.string(),
  })
  .required();

export type CreateMemoDto = z.infer<typeof createMemoSchema>;