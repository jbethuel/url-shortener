import { BaseResponse } from '../models/BaseResponse';
import { Link } from '../models/Link';
import { axiosConfig, parseReponse } from './axios';

export const api = {
  getLinkList: () => ({
    key: ['link-list'],
    fn: async () => {
      const result = await axiosConfig.instance.get<BaseResponse<Link[]>>('/api/link/list');

      return parseReponse(result);
    },
  }),
  createNewLink: () => ({
    key: ['create'],
    fn: async (payload: { path: string; url: string }) => {
      const result = await axiosConfig.instance.post<BaseResponse<Link>>(
        '/api/link/create',
        payload,
      );

      return parseReponse(result);
    },
  }),
};
