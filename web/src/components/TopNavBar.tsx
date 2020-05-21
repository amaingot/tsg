import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    borderBottom: `1px solid ${theme.palette.divider}`,
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

interface Props {
  title: string;
}

const TopNavBar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { title } = props;

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
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
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
