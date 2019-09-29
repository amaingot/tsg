import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withAuth, WithAuthProps } from '../enhancers/withAuth';
import { SiteRoutes } from '../routes/SiteRoutes';
import CustomNavLink from '../utils/CustomLink';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  titleLink: {
    color: 'inherit',
  },
  navButton: {
    margin: '0 10px',
  },
  authButton: {
    marginLeft: '16px',
  },
});

const SiteHeader: React.FC<WithAuthProps> = props => {
  const { auth } = props;
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <CustomNavLink className={classes.titleLink} to="/">
            Tennis Shop Guru
          </CustomNavLink>
        </Typography>

        {SiteRoutes.map(r => (
          <CustomNavLink key={r.path} to={r.path}>
            <Button className={classes.navButton}>{r.label}</Button>
          </CustomNavLink>
        ))}

        <CustomNavLink to="/signup">
          <Button className={classes.navButton}>Sign Up</Button>
        </CustomNavLink>

        {auth.loggedIn && (
          <CustomNavLink to="/app">
            <Button color="primary" variant="outlined" className={classes.navButton}>
              Dashboard
            </Button>
          </CustomNavLink>
        )}

        {auth.loggedIn ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => auth.signOut()}
            className={classes.authButton}
          >
            Sign Out
          </Button>
        ) : (
            <CustomNavLink to="/signin">
              <Button className={classes.authButton} color="primary" variant="outlined">
                Login
            </Button>
            </CustomNavLink>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default withAuth<{}>(SiteHeader);
