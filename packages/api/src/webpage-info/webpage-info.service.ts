import { Injectable } from '@nestjs/common';
import {
  WebpageInfo,
  WebpageInfoService,
} from '../shared/services/webpage-info.service';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class WebpageInfoServiceImpl extends WebpageInfoService {
  async find(url: string): Promise<WebpageInfo> {
    return axios
      .get<string>(url)
      .then((response) => response.data)
      .then(async (html) => {
        const $ = load(html);
        const baseUrl = new URL(url).origin;

        const title = $('title').text() || url;

        const favicon =
          $('link[rel="icon"]').attr('href') ??
          $('link[rel="shortcut icon"]').attr('href');
        let faviconPath = (() => {
          if (!favicon) {
            return undefined;
          }
          if (favicon.startsWith('http')) {
            return favicon;
          }
          return `${baseUrl}/${favicon}`;
        })();

        if (!faviconPath) {
          faviconPath = await this.findAlternativeIcon(baseUrl);
        }

        return { title, icon: faviconPath };
      })
      .catch(() => ({}));
  }

  async findAlternativeIcon(baseUrl: string): Promise<string | undefined> {
    let iconUrl = `${baseUrl}/favicon.ico`;
    try {
      await axios.head(iconUrl);
      return iconUrl;
    } catch (e) {}

    iconUrl = `${baseUrl}/images/favicon.ico`;
    try {
      await axios.head(iconUrl);
      return iconUrl;
    } catch (e) {}
  }
}
