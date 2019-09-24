import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import SiteFooter from 'src/components/SiteFooter';
import SiteHeader from 'src/components/SiteHeader';
import { SiteRoutesSwitch } from 'src/routes/SiteRoutes';

export const siteLayoutStyles: StyleRulesCallback = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

type Props = WithStyles & RouteComponentProps;

const SiteLayout: React.FunctionComponent<Props> = props => {
  const { classes } = props;
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

export default withStyles(siteLayoutStyles)(SiteLayout);
