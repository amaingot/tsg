import { RouteType } from 'routes/index';

import LoginPage from 'pages/Login';
// import LockScreenPage from 'views/Pages/LockScreenPage.jsx';
import PricingPage from 'pages/Pricing';
import RegisterPage from 'pages/Register';

// @material-ui/icons
import Fingerprint from '@material-ui/icons/Fingerprint';
// import LockOpen from '@material-ui/icons/LockOpen';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import PersonAdd from '@material-ui/icons/PersonAdd';

const pagesRoutes: RouteType[] = [
  {
    path: '/register-page',
    name: 'Register',
    short: 'Register',
    mini: 'RP',
    icon: PersonAdd,
    component: RegisterPage,
  },
  {
    path: '/login-page',
    name: 'Login',
    short: 'Login',
    mini: 'LP',
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
  // {
  //   path: '/pages/lock-screen-page',
  //   name: 'Lock Screen Page',
  //   short: 'Lock',
  //   mini: 'LSP',
  //   icon: LockOpen,
  //   component: LockScreenPage,
  // },
  // {
  //   redirect: true,
  //   path: '/pages',
  //   pathTo: '/pages/register-page',
  //   name: 'Register Page',
  // },
];

export default pagesRoutes;
