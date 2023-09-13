import { Path } from 'path-parser';
import qs from 'query-string';

const buildPath = (template: string, values: object): string => {
  try {
    const path = new Path(template);
    return path.build(values);
  } catch (e) {
    return '';
  }
};

const buildQueryString = (queryParams: object) => {
  if (!queryParams || !Object.keys(queryParams).length) return '';
  return `?${qs.stringify(queryParams)}`;
};

export const routeContext = <P extends object | undefined, Q extends object | undefined>(
  path: string,
) => ({
  path,
  parsePath: (args: { params: P; query: Q }) => {
    const { params, query } = args;

    const urlParams = params || {};
    const urlQuery = query || {};

    return `${buildPath(path, urlParams)}${buildQueryString(urlQuery)}`;
  },
});
