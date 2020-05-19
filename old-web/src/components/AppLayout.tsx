import React from "react";
import clsx from "clsx";

import { Theme as DefaultTheme } from "@material-ui/core/styles/createMuiTheme";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AppNavBar from "./AppNavBar";
import AppNavDrawer from "./AppNavDrawer";
import Copyright from "./Copyright";
import { useRightDrawerContext } from "../contexts/RightDrawerContext";

interface StyleProps {
  drawerWidth?: number;
}

const useStyles = makeStyles<DefaultTheme, StyleProps>(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  contentDrawerClosed: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: 0
  },
  contentDrawerOpen: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: props => props.drawerWidth
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = props => {
  const { drawerWidth, drawerOpen: rightDrawerOpen } = useRightDrawerContext();

  const classes = useStyles({
    drawerWidth
  });
  const { children } = props;

  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setNavDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setNavDrawerOpen(false);
  };

  const contentClass = clsx(
    classes.content,
    rightDrawerOpen ? classes.contentDrawerOpen : classes.contentDrawerClosed
  );

  return (
    <div className={classes.root}>
      <AppNavBar
        handleDrawerOpen={handleDrawerOpen}
        drawerOpen={navDrawerOpen}
      />
      <AppNavDrawer
        open={navDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <main className={contentClass}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
        <Copyright />
      </main>
    </div>
  );
};

export default AppLayout;
