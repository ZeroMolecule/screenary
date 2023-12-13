export abstract class WebpageInfoService {
  abstract find(url: string): Promise<WebpageInfo>;
}

export type WebpageInfo = {
  title?: string;
  icon?: string;
};
