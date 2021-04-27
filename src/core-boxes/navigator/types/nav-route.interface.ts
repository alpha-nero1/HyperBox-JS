import { Box } from '../../../box';

export interface NavRouteItem {
  box: typeof Box;
  exact?: boolean;
}

export interface NavRoutes {
  [key: string]: NavRouteItem
}