import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  WEB_URL: z.string().min(1),
});

const envParsed = envSchema.safeParse(process.env);
if (!envParsed.success) {
  console.error(envParsed.error.issues);
  throw new Error('There is an error with the environment variables');
  process.exit(1);
}

export const ENV = envParsed.data;
