import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { SiteRoutesSwitch } from '../routes/SiteRoutes';
import { makeStyles } from '../utils/Theme';

export const useSiteLayoutStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));


const SiteLayout: React.FC<RouteComponentProps> = props => {
  const classes = useSiteLayoutStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <SiteHeader />
      <main className={classes.layout}>
        <SiteRoutesSwitch />
      </main>
      <SiteFooter />
    </React.Fragment>
  );
};

export default SiteLayout;
