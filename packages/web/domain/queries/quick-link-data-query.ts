import axios from 'axios';
import { getAxiosData } from '../remote/response/data';

const QUICK_LINK_DATA_QUERY_KEY = 'quick-link-data';

export const quickLinkDataQuery = {
  key: (id: string) => [`${QUICK_LINK_DATA_QUERY_KEY}/${id}`],
  fnc: (url: string) => axios.get(url).then(getAxiosData<string>),
};
