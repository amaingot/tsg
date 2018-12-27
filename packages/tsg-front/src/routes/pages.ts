import { RouteType } from 'routes/index';

import LoginPage from 'pages/Login';
// import LockScreenPage from 'views/Pages/LockScreenPage.jsx';
// import PricingPage from 'views/Pages/PricingPage.jsx';
// import RegisterPage from 'views/Pages/RegisterPage.jsx';

// @material-ui/icons
import Fingerprint from '@material-ui/icons/Fingerprint';
// import LockOpen from '@material-ui/icons/LockOpen';
// import MonetizationOn from '@material-ui/icons/MonetizationOn';
// import PersonAdd from '@material-ui/icons/PersonAdd';

const pagesRoutes: RouteType[] = [
  // {
  //   path: '/pages/register-page',
  //   name: 'Register Page',
  //   short: 'Register',
  //   mini: 'RP',
  //   icon: PersonAdd,
  //   component: RegisterPage,
  // },
  {
    path: '/pages/login-page',
    name: 'Login Page',
    short: 'Login',
    mini: 'LP',
    icon: Fingerprint,
    component: LoginPage,
  },
  // {
  //   path: '/pages/pricing-page',
  //   name: 'Pricing Page',
  //   short: 'Pricing',
  //   mini: 'PP',
  //   icon: MonetizationOn,
  //   component: PricingPage,
  // },
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
