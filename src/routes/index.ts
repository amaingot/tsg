import { RouteComponentProps } from 'react-router';
import { CustomRouteProps } from 'src/utils/CustomRoute';

export interface RouteConfig extends CustomRouteProps {
  path: string;
  component: React.ComponentType<RouteComponentProps>;
  exact?: boolean;
  label: string;
  icon?: React.ComponentType;
}
