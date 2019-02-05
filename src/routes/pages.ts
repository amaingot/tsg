import { RouteType } from 'src/routes/index';

import LoginPage from 'src/pages/Login';
import PricingPage from 'src/pages/Pricing';
import RegisterPage from 'src/pages/Register';

// @material-ui/icons
import Fingerprint from '@material-ui/icons/Fingerprint';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import PersonAdd from '@material-ui/icons/PersonAdd';

const pagesRoutes: RouteType[] = [
  {
    path: '/signup',
    name: 'Sign Up',
    short: 'Sign Up',
    mini: 'Sign Up',
    icon: PersonAdd,
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    short: 'Login',
    mini: 'Login',
    icon: Fingerprint,
    component: LoginPage,
  },
  {
    path: '/pricing',
    name: 'Pricing',
    short: 'Pricing',
    mini: 'PP',
    icon: MonetizationOn,
    component: PricingPage,
  },
];

export default pagesRoutes;
