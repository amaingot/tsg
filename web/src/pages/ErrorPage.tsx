import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';

import SimpleLayout from 'src/layouts/SimpleLayout';
import CustomNavLink from 'src/utils/CustomLink';

const styles: StyleRulesCallback = theme => ({
  icon: {
    margin: `0 auto ${theme.spacing.unit * 3}px`,
    fontSize: `${theme.spacing.unit * 18}px`,
  },
  homeLink: {
    margin: `${theme.spacing.unit * 2}px auto 0`,
  },
});

const ErrorPage: React.FunctionComponent<RouteComponentProps & WithStyles> = props => {
  const { classes } = props;

  return (
    <SimpleLayout>
      <ErrorIcon className={classes.icon} color="action" />
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
        Uh oh...
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" component="p">
        Looks like we've run into an error. Maybe try clicking the back button?
      </Typography>
      <Typography className={classes.homeLink} variant="button" align="center" component="p">
        <CustomNavLink to="/">Go back home</CustomNavLink>
      </Typography>
    </SimpleLayout>
  );
};

export default withStyles(styles)(ErrorPage);
