import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AppNavBar from './AppNavBar';
import AppNavDrawer from './AppNavDrawer';
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = props => {
  const classes = useStyles();
  const { children } = props;

  const [drawerOpen, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppNavBar handleDrawerOpen={handleDrawerOpen} drawerOpen={drawerOpen} />
      <AppNavDrawer open={drawerOpen} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
        <Copyright />
      </main>
    </div>
  );
}

export default AppLayout;