import { BaseResponse } from '../models/BaseResponse';
import { Link } from '../models/Link';
import { axiosConfig, parseReponse } from './axios';

export const api = {
  getLink: (args: { linkId: string }) => ({
    key: ['link-item', ...Object.values(args)],
    fn: async () => {
      const result = await axiosConfig.instance.get<BaseResponse<Link>>(
        `/api/link/get/${args.linkId}`,
      );

      return parseReponse(result);
    },
  }),
  getLinkList: () => ({
    key: ['link-list'],
    fn: async (fnArgs: { page: number }) => {
      const { page = 1 } = fnArgs;
      const result = await axiosConfig.instance.get<BaseResponse<{ links: Link[]; total: number }>>(
        `/api/link/list?page=${page}`,
      );

      return parseReponse(result);
    },
  }),
  createLink: () => ({
    key: ['create'],
    fn: async (payload: { path: string; url: string }) => {
      const result = await axiosConfig.instance.post<BaseResponse<Link>>(
        '/api/link/create',
        payload,
      );

      return parseReponse(result);
    },
  }),
  patchLink: (args: { linkId: string }) => ({
    key: ['patch', args.linkId],
    fn: async (payload: { path: string; url: string }) => {
      const result = await axiosConfig.instance.patch<BaseResponse<Link>>(
        `/api/link/update/${args.linkId}`,
        payload,
      );

      return parseReponse(result);
    },
  }),
  deleteLink: (args: { linkId: string }) => ({
    key: ['delete', args.linkId],
    fn: async () => {
      const result = await axiosConfig.instance.delete<BaseResponse<Link>>(
        `/api/link/delete/${args.linkId}`,
      );

      return parseReponse(result);
    },
  }),
};
