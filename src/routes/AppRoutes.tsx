import * as React from 'react';
import { Switch } from 'react-router';

import Icon, { IconProps } from '@material-ui/core/Icon';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import CustomersPage from 'src/pages/CustomersPage';
import DashboardPage from 'src/pages/DashboardPage';
import EmployeesPage from 'src/pages/EmployeesPage';
import JobsPage from 'src/pages/JobsPage';
import { RouteConfig } from 'src/routes';
import CustomRedirect from 'src/utils/CustomRedirect';
import CustomRoute from 'src/utils/CustomRoute';

const IDBadgeIcon: React.SFC<IconProps> = props => (
  <Icon {...props} style={{ paddingLeft: '3px' }} className="fa fa-id-badge" />
);

export const AppRoutes: Array<RouteConfig | null> = [
  {
    path: '/app/dashboard',
    component: DashboardPage,
    exact: true,
    label: 'Dashboard',
    icon: HomeIcon,
  },
  { path: '/app/jobs', component: JobsPage, label: 'Jobs', icon: AssignmentIcon },
  { path: '/app/customers', component: CustomersPage, label: 'Customers', icon: PeopleIcon },
  {
    path: '/app/employees',
    component: EmployeesPage,
    label: 'Employees',
    icon: IDBadgeIcon,
  },
  null,
  { path: '/app/settings', component: CustomersPage, label: 'Administration', icon: SettingsIcon },
];

export const AppRoutesSwitch: React.FunctionComponent = () => {
  return (
    <Switch>
      <CustomRedirect from="/app" exact to="/app/customers" />
      {AppRoutes.map(r => r && <CustomRoute key={r.path} privatePath {...r} />)}
      <CustomRedirect to="/error" />
    </Switch>
  );
};
