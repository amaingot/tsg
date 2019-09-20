import { RouteComponentProps } from 'react-router';

import { UserGroup } from 'src/enhancers/withAuth';
import { CustomRouteProps } from 'src/utils/CustomRoute';

export interface RouteConfig extends CustomRouteProps {
  path: string;
  component: React.ComponentType<RouteComponentProps>;
  exact?: boolean;
  label: string;
  icon?: React.ComponentType;
  allowedGroups?: UserGroup[];
  renderInMenu?: boolean;
}
