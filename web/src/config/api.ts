import { Link } from '../models/Link';
import { axiosConfig } from './axios';

export const api = {
  getLinkList: () => ({
    key: ['link-list'],
    fn: async () => {
      const result = await axiosConfig.instance.get<{ message: string; data: Link[] }>(
        '/api/link/list',
      );
      return result.data;
    },
  }),
  createNewLink: () => ({
    key: ['create'],
    fn: async (payload: { path: string }) => {
      const result = await axiosConfig.instance.post('/api/link/create', payload);
      return result.data;
    },
  }),
};
