import * as React from 'react';
import { Switch } from 'react-router';

import HomePage from '../pages/HomePage';
import PricingPage from '../pages/PricingPage';
import { RouteConfig } from '../routes';
import CustomRedirect from '../utils/CustomRedirect';
import CustomRoute from '../utils/CustomRoute';

export const SiteRoutes: RouteConfig[] = [
  { path: '/', component: HomePage, exact: true, label: 'Home' },
  { path: '/pricing', component: PricingPage, exact: true, label: 'Pricing' },
  { path: '/support', component: PricingPage, exact: true, label: 'Support' },
];

export const SiteRoutesSwitch: React.FC = () => {
  return (
    <Switch>
      {SiteRoutes.map(r => r && <CustomRoute key={r.path} {...r} />)}
      <CustomRedirect to="/error" />
    </Switch>
  );
};
