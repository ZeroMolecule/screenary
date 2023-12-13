import axios from 'axios';
import { getAxiosData } from '../remote/response/data';
import { extractTitleAndFavicon } from '@/utils/url';

const EMBEDDED_PAGE_DATA_QUERY_KEY = 'embedded-page-data';

export const embeddedPageDataQuery = {
  key: (id: string) => [`${EMBEDDED_PAGE_DATA_QUERY_KEY}/${id}`],
  fnc: (url: string) =>
    axios
      .get(url)
      .then(getAxiosData<string>)
      .then(extractTitleAndFavicon(url)),
};
