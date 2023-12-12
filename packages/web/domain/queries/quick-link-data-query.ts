import axios from 'axios';
import { load } from 'cheerio';
import { getAxiosData } from '../remote/response/data';

const QUICK_LINK_DATA_QUERY_KEY = 'quick-link-data';

export const quickLinkDataQuery = {
  key: (id: string) => [`${QUICK_LINK_DATA_QUERY_KEY}/${id}`],
  fnc: (url: string) =>
    axios
      .get(url)
      .then(getAxiosData<string>)
      .then((html) => {
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
      })
      .catch(() => ({ title: url, favicon: null })),
};
