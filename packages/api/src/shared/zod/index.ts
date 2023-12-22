import { z } from 'zod';

const protocolPrefixes = ['http://', 'https://', 'ftp://'];

const urlField = z
  .string()
  .regex(
    /^[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/,
    'Invalid url'
  );

export const urlWithPrefixField = urlField.transform((url) => {
  if (!protocolPrefixes.some((el) => url.includes(el))) {
    return `https://${url}`;
  }
  return url;
});
