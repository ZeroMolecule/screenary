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
  .refine(
    (value) => {
      try {
        z.string().url().parse(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    { message: 'Invalid url' }
  );
