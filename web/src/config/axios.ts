import axios, { AxiosResponse } from 'axios';
import { BaseResponse } from '../models/BaseResponse';

const instance = axios.create({
  baseURL: location.hostname.includes('azurestaticapps')
    ? 'https://urls-prod-api.azurewebsites.net'
    : 'http://localhost:5232',
});

export const axiosConfig = {
  instance,
  setBearerToken: (token: string) => {
    instance.defaults.headers.common = { Authorization: `Bearer ${token}` };
  },
};

export const parseReponse = <T>(response: AxiosResponse<BaseResponse<T>>): T => {
  if (response.data.type !== 'Success') {
    throw new Error(response.data.message || response.data.type);
  }

  return response.data.data as T;
};
