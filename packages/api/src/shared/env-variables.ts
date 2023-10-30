import z from 'zod';

export type EnvVariables = z.infer<typeof envVariablesSchema>;

export const envVariablesSchema = z.object({
  NODE_ENV: z.enum(['production', 'development']),
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
});
