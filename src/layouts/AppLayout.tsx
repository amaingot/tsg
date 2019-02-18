import classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { StyleRulesCallback, withStyles, WithStyles, WithTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import { AppRoutes, AppRoutesSwitch } from 'src/routes/AppRoutes';
import CustomNavLink from 'src/utils/CustomLink';

const drawerWidth = 240;

const styles: StyleRulesCallback = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuTitle: {
    flexGrow: 1,
    color: 'inherit',
  },
  signOutButton: {
    marginRight: '32px',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    paddingLeft: '12px',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  listItem: {
    paddingLeft: '24px',
  },
  listDivider: {
    margin: '10px 0',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

type AdditionalProps = WithStyles & WithTheme & RouteComponentProps & WithAuthProps;

interface Props extends AdditionalProps {
  children: React.ReactNode;
}

interface State {
  sidebarOpen: boolean;
}

class AppLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  public handleDrawerOpen = () => {
    this.setState({ sidebarOpen: true });
  };

  public handleDrawerClose = () => {
    this.setState({ sidebarOpen: false });
  };

  public handleSignOut = () => {
    const { signOut } = this.props.auth;
    signOut();
  };

  public render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.sidebarOpen,
          })}
        >
          <Toolbar disableGutters={!this.state.sidebarOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.sidebarOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.menuTitle}>
              <CustomNavLink exact to="/" className={classes.menuTitle}>
                Tennis Shop Guru
              </CustomNavLink>
            </Typography>
            <Button className={classes.signOutButton} onClick={this.handleSignOut} color="inherit">
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.sidebarOpen,
            [classes.drawerClose]: !this.state.sidebarOpen,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.sidebarOpen,
              [classes.drawerClose]: !this.state.sidebarOpen,
            }),
          }}
          open={this.state.sidebarOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {AppRoutes.map((route, i) => {
              if (route === null) {
                return <Divider key={i} className={classes.listDivider} />;
              }

              return (
                <CustomNavLink key={route.path} to={route.path}>
                  <ListItem button key={route.path} className={classes.listItem}>
                    {route.icon && <ListItemIcon>{<route.icon />}</ListItemIcon>}
                    <ListItemText primary={route.label} />
                  </ListItem>
                </CustomNavLink>
              );
            })}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AppRoutesSwitch />
        </main>
      </div>
    );
  }
}

const StyledAppLayout = withStyles(styles, { withTheme: true })(AppLayout);

export default withAuth(StyledAppLayout);
