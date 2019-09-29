import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';

import SimpleLayout from '../layouts/SimpleLayout';
import CustomNavLink from '../utils/CustomLink';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  icon: {
    margin: `0 auto ${theme.spacing(3)}px`,
    fontSize: `19px`,
  },
  homeLink: {
    margin: `${theme.spacing(2)}px auto 0`,
  },
}));

const ErrorPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();

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

export default (ErrorPage);
