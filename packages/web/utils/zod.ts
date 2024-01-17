import { z } from 'zod';

export const zodUrlField = z
  .string()
  .regex(
    /^[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/,
    'Invalid url'
  );
