import { z } from 'zod';

const protocolPrefixes = ['http://', 'https://'];

export const urlSchema = z
  .string()
  .transform((value) => {
    if (!protocolPrefixes.some((el) => value.startsWith(el))) {
      return `https://${value}`;
    }
    return value;
  })
  .refine((value) => z.string().url().parse(value));
