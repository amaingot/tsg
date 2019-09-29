import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const HomeNavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Tennis Shop Guru
      </Typography>
        <nav>
          <Link component={RouterLink} variant="button" color="textPrimary" to="/" className={classes.link}>
            Home
          </Link>
          <Link component={RouterLink} variant="button" color="textPrimary" to="/pricing" className={classes.link}>
            Pricing
          </Link>
          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            Support
          </Link>
        </nav>
        <Button component={RouterLink} to="/sign-in" color="primary" variant="outlined" className={classes.link}>
          Login
      </Button>
      </Toolbar>
    </AppBar>
  );
}

export default HomeNavBar;