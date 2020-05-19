import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Auth, { CognitoUser } from "@aws-amplify/auth";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

const HomeNavBar: React.FC = () => {
  const classes = useStyles();

  const [user, setUser] = React.useState<CognitoUser>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        setLoading(false);
        if (user instanceof CognitoUser) {
          user.getUserData(
            (error, userData) =>
              !error &&
              !!userData &&
              window.Rollbar.configure({
                payload: {
                  person: {
                    id: userData.Username,
                    username: (
                      userData.UserAttributes.find(a => a.Name === "email") ||
                      {}
                    ).Value,
                    email: (
                      userData.UserAttributes.find(a => a.Name === "email") ||
                      {}
                    ).Value
                  }
                }
              })
          );
        }
      })
      .catch(() => {
        // do nothing
        setLoading(false);
      });
  }, []);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Tennis Shop Guru
        </Typography>
        <nav>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/"
            className={classes.link}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/features"
            className={classes.link}
          >
            Features
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/pricing"
            className={classes.link}
          >
            Pricing
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="/support"
            className={classes.link}
          >
            Support
          </Link>
        </nav>
        <Button
          component={RouterLink}
          to={!user ? "/login" : "/app"}
          color="primary"
          variant={!user ? "outlined" : "contained"}
          className={classes.link}
          disabled={loading}
        >
          {!user ? "Login" : "Go To App"}
        </Button>
        {!user && (
          <Button
            component={RouterLink}
            to="/signup"
            color="primary"
            variant="contained"
            className={classes.link}
          >
            Sign Up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavBar;
