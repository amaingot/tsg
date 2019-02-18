import * as React from 'react';
import { Switch } from 'react-router';

import HomePage from 'src/pages/HomePage';
import PricingPage from 'src/pages/PricingPage';
import { RouteConfig } from 'src/routes';
import CustomRedirect from 'src/utils/CustomRedirect';
import CustomRoute from 'src/utils/CustomRoute';

export const SiteRoutes: RouteConfig[] = [
  { path: '/', component: HomePage, exact: true, label: 'Home' },
  { path: '/pricing', component: PricingPage, exact: true, label: 'Pricing' },
  { path: '/support', component: PricingPage, exact: true, label: 'Support' },
];

export const SiteRoutesSwitch: React.FunctionComponent = () => {
  return (
    <Switch>
      {SiteRoutes.map(r => r && <CustomRoute key={r.path} {...r} />)}
      <CustomRedirect to="/error" />
    </Switch>
  );
};
