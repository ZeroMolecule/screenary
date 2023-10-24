import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  WEB_URL: z.string().min(1),
  TEST: z.string(),
});

const envParsed = envSchema.parse(process.env);

export const ENV = envParsed;
