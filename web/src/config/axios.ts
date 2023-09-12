import axios from 'axios';

const instance = axios.create({
  baseURL: location.hostname.includes('azurestaticapps')
    ? 'https://urls-prod-api.azurewebsites.net'
    : 'http://localhost:5232',
});

export const axiosConfig = {
  instance,
  setBearerToken: (token: string) => {
    instance.defaults.headers.common = { authorization: `Bearer ${token}` };
  },
};
