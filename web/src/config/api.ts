import { axiosConfig } from './axios';

export const api = {
  getLinkList: () => ({
    key: ['link-list'],
    fn: async () => {
      return await axiosConfig.instance.get('/api/link/list');
    },
  }),
};
