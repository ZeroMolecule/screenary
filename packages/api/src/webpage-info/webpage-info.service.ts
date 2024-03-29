import { Injectable } from '@nestjs/common';
import {
  WebpageInfo,
  WebpageInfoService,
} from '../shared/services/webpage-info.service';
import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';

@Injectable()
export class WebpageInfoServiceImpl extends WebpageInfoService {
  async find(url: string): Promise<WebpageInfo> {
    return axios
      .get<string>(url)
      .then((response) => response.data)
      .then(async (html) => {
        const $ = load(html);
        const baseUrl = new URL(url).origin;

        const title = this.findTitle($);
        const icon = await this.findIcon($, baseUrl);

        return { title, icon };
      })
      .catch(() => ({}));
  }

  private async findIcon($: CheerioAPI, baseUrl: string) {
    let favicon = await this.findManifestIcon($, baseUrl);
    if (!favicon) {
      favicon = await this.findMetaIcon($, baseUrl);
    }
    if (!favicon) {
      favicon = await this.findAlternativeIcon(baseUrl);
    }
    return favicon;
  }

  private async findAlternativeIcon(baseUrl: string) {
    return (
      (await this.validateUrl(`${baseUrl}/favicon.ico`)) ||
      (await this.validateUrl(`${baseUrl}/images/favicon.ico`))
    );
  }

  private async findManifestIcon($: CheerioAPI, baseUrl: string) {
    let manifestUrl = $('link[rel="manifest"]').attr('href');
    if (!manifestUrl) {
      return undefined;
    }
    if (!manifestUrl.startsWith('http')) {
      manifestUrl = `${baseUrl}/${manifestUrl}`;
    }

    const manifest = await axios
      .get(manifestUrl)
      .then((response) => response.data)
      .catch(() => undefined);

    if (!manifest) {
      return undefined;
    }

    const iconUrl = manifest.icons?.at(-1)?.src;
    if (!iconUrl) {
      return undefined;
    }

    if (!iconUrl.startsWith('http')) {
      return `${baseUrl}/${iconUrl}`;
    }

    if (await this.validateUrl(iconUrl)) {
      return iconUrl;
    }
  }

  private async findMetaIcon($: CheerioAPI, baseUrl: string) {
    let iconUrl =
      $('link[rel="icon"]').attr('href') ??
      $('link[rel="shortcut icon"]').attr('href');

    if (!iconUrl) {
      return undefined;
    }

    if (!iconUrl.startsWith('http')) {
      iconUrl = `${baseUrl}/${iconUrl}`;
    }

    if (await this.validateUrl(iconUrl)) {
      return iconUrl;
    }
  }

  private findTitle($: CheerioAPI) {
    return $('title').text();
  }

  private async validateUrl(url: string) {
    try {
      const response = await axios.get(url);
      return response.request?.res?.responseUrl ?? url;
    } catch (e) {
      return undefined;
    }
  }
}
