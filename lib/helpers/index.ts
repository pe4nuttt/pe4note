import {
  LOCAL_STORAGE_KEYS,
  type LastVisitedRoute,
} from '../constants/preferences';

export function setLastVisitedRoute(route: LastVisitedRoute) {
  const routeString = JSON.stringify(route);
  localStorage.setItem(LOCAL_STORAGE_KEYS.LRU_LAST_VISITED_ROUTE, routeString);
}

export function getLastVisitedRoute(): LastVisitedRoute | null {
  const routeString = localStorage.getItem(
    LOCAL_STORAGE_KEYS.LRU_LAST_VISITED_ROUTE,
  );

  if (routeString) return JSON.parse(routeString);

  return null;
}
