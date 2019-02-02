import { RouteType } from 'src/routes/index';

import LoginPage from 'src/pages/Login';
// import LockScreenPage from 'views/Pages/LockScreenPage.jsx';
import PricingPage from 'src/pages/Pricing';
import RegisterPage from 'src/pages/Register';

// @material-ui/icons
import Fingerprint from '@material-ui/icons/Fingerprint';
// import LockOpen from '@material-ui/icons/LockOpen';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import PersonAdd from '@material-ui/icons/PersonAdd';

const pagesRoutes: RouteType[] = [
  {
    path: '/register',
    name: 'Register',
    short: 'Register',
    mini: 'RP',
    icon: PersonAdd,
    component: RegisterPage,
  },
  {
    path: '/login',
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
  //   path: '/pages/lock-screen',
  //   name: 'Lock Screen Page',
  //   short: 'Lock',
  //   mini: 'LSP',
  //   icon: LockOpen,
  //   component: LockScreenPage,
  // },
  // {
  //   redirect: true,
  //   path: '/pages',
  //   pathTo: '/pages/register',
  //   name: 'Register Page',
  // },
];

export default pagesRoutes;
