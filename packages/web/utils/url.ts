import { load } from 'cheerio';

export const extractTitleAndFavicon = (url: string) => (html: string) => {
  const $ = load(html);
  const baseUrl = new URL(url).origin;

  const title = $('title').text() || url;

  const favicon =
    $('link[rel="icon"]').attr('href') ??
    $('link[rel="shortcut icon"]').attr('href');
  const faviconPath = (() => {
    if (!favicon) {
      return null;
    }
    if (favicon.startsWith('http')) {
      return favicon;
    }
    return `${baseUrl}/${favicon}`;
  })();

  return { title, favicon: faviconPath };
};

export const extractTitleAndOGImage = (url: string) => (html: string) => {
  const $ = load(html);

  const title = $('title').text() || url;

  const ogImage =
    $('meta[property="og:image"]').attr('content') ??
    $('meta[name="twitter:image"]').attr('content');

  return { title, ogImage };
};
