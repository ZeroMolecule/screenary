import { z } from 'zod';

export const meUpdateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  image: z.string().min(1),
});
export type MeUpdateDto = z.infer<typeof meUpdateSchema>;
