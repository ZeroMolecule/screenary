import { AxiosResponse } from 'axios';

export interface Data<Data, Meta = Record<string, never>> {
  data: Data;
  meta: Meta;
}

export const getAxiosData = <T>(response: AxiosResponse<T>) => response.data;

export const getRemoteData = <T>(response: AxiosResponse<Data<T>>) =>
  getAxiosData(response).data;
