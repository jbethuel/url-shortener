import { routeContext } from '../utils/pathContext';

export const routes = {
  root: '/',
  dashboard: routeContext<undefined, undefined>('/dashboard'),
  dashboardHome: routeContext<undefined, undefined>('/dashboard/home'),
  dashboardLinks: routeContext<undefined, undefined>('/dashboard/links'),
  dashboardLinkView: routeContext<{ id: string }, undefined>('/dashboard/link/:id'),
  dashboardLinkCreate: routeContext<undefined, undefined>('/dashboard/link/create'),
  dashboardSettings: routeContext<undefined, undefined>('/dashboard/settings'),
};
