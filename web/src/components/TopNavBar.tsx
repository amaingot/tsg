import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useAuth } from "../contexts/AuthContext";
import auth from "../utils/auth";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: 1300,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    cursor: "pointer",
  },
  logo: {
    maxHeight: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  navButton: {
    marginLeft: theme.spacing(2),
  },
}));

const PublicMenu: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.navButton}
        color="inherit"
        onClick={() => history.push("/sign-up")}
      >
        Sign Up
      </Button>
      <Button
        className={classes.navButton}
        color="inherit"
        onClick={() => history.push("/login")}
      >
        Login
      </Button>
    </>
  );
};

const MarketingMenu: React.FC<{ loggedIn: boolean }> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { loggedIn } = props;

  return (
    <>
      <Button
        className={classes.navButton}
        color="inherit"
        onClick={() => history.push("/")}
      >
        Home
      </Button>
      <Button
        className={classes.navButton}
        color="inherit"
        onClick={() => history.push("/pricing")}
      >
        Pricing
      </Button>
      {loggedIn && (
        <Button
          className={classes.navButton}
          color="secondary"
          variant="contained"
          onClick={() => history.push("/app")}
        >
          Go To App
        </Button>
      )}
    </>
  );
};

const CustomerMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.navButton}
        color="inherit"
        onClick={() => auth.signOut()}
      >
        Logout
      </Button>
    </>
  );
};

interface Props {
  title: string;
  toggleDrawerButton?: React.FC<any>;
}

const TopNavBar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { loggedIn } = useAuth();
  const { title, toggleDrawerButton: ToggleDrawerButton } = props;

  const inApp = location.pathname.startsWith("/app");

  return (
    <AppBar color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {ToggleDrawerButton && <ToggleDrawerButton />}
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
          onClick={() => history.push("/")}
        >
          {title}
        </Typography>
        <nav>
          {inApp ? undefined : <MarketingMenu loggedIn={loggedIn} />}
          {loggedIn ? <CustomerMenu /> : <PublicMenu />}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
