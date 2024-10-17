export interface LastVisitedRoute {
  entityType: 'document' | 'collection' | 'workspace';
  entityId: string;
  timestamp?: number;
}

export const LOCAL_STORAGE_KEYS = {
  LRU_LAST_VISITED_ROUTE: 'LRU::lastVisitedRoute',
};
