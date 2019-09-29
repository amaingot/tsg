import classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import WorkIcon from '@material-ui/icons/Work';

import { withAuth, WithAuthProps } from '../enhancers/withAuth';
import CustomNavLink from '../utils/CustomLink';
import { makeStyles } from '../utils/Theme';

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
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
  accountGreeting: {
    background: `${theme.palette.grey[300]} !important`,
    cursor: 'unset !important',
  },
  menuIcon: {
    marginRight: theme.spacing(1.5),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuTitle: {
    flexGrow: 1,
    color: 'inherit',
  },
  open: {
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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toggleButton: {
    position: 'absolute',
    top: theme.spacing(18),
    zIndex: 1201,
    width: theme.spacing(4),
    height: theme.spacing(4),
    minHeight: theme.spacing(4),
  },
  toggleIcon: {},
  toggleButtonOpen: {
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    left: drawerWidth - theme.spacing(2),
  },
  toggleButtonClose: {
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    left: theme.spacing(7),
  },
  accountMenu: {
    zIndex: 1199,
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
    padding: theme.spacing(3),
  },
}));

type AdditionalProps = RouteComponentProps & WithAuthProps;

interface Props extends AdditionalProps {
  children: React.ReactNode;
}

interface State {
  sidebarOpen: boolean;
  accountMenuAnchor?: HTMLElement;
}

class AppLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };
  }

  public toggleDrawer = () => {
    this.setState(state => ({ sidebarOpen: !state.sidebarOpen }));
  };

  public openMenu = (e: React.SyntheticEvent<HTMLElement>) => {
    this.setState({ accountMenuAnchor: e.currentTarget });
  };

  public closeMenu = () => {
    this.setState({ accountMenuAnchor: undefined });
  };

  public handleSignOut = () => {
    const { signOut } = this.props.auth;
    signOut();
  };

  public render() {
    const { auth } = this.props;
    const classes = useStyles();

    const menuOpen = !!this.state.accountMenuAnchor;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.menuTitle}>
              <CustomNavLink exact to="/" className={classes.menuTitle}>
                Tennis Shop Guru
              </CustomNavLink>
            </Typography>
            <div>
              <IconButton
                className={classes.accountButton}
                onClick={menuOpen ? this.closeMenu : this.openMenu}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                anchorEl={this.state.accountMenuAnchor}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: -56,
                  horizontal: 'right',
                }}
                open={menuOpen}
                onClose={this.closeMenu}
                className={classes.accountMenu}
              >
                <MenuItem disableTouchRipple className={classes.accountGreeting}>
                  {auth.user && `Hello, ${auth.user.firstName} ${auth.user.lastName}!`}
                </MenuItem>
                <Divider />
                <MenuItem>
                  <AccountCircleIcon className={classes.menuIcon} /> User Settings
                </MenuItem>
                <MenuItem>
                  <WorkIcon className={classes.menuIcon} /> Company Settings
                </MenuItem>
                <MenuItem>
                  <HelpIcon className={classes.menuIcon} /> Help
                </MenuItem>
                <MenuItem onClick={this.handleSignOut}>
                  <ExitToAppIcon className={classes.menuIcon} /> Sign Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Fab
          onClick={this.toggleDrawer}
          className={classNames(classes.toggleButton, {
            [classes.toggleButtonOpen]: this.state.sidebarOpen,
            [classes.toggleButtonClose]: !this.state.sidebarOpen,
          })}
          size="small"
        >
          {this.state.sidebarOpen ? (
            <ChevronLeftIcon className={classes.toggleIcon} />
          ) : (
              <ChevronRightIcon className={classes.toggleIcon} />
            )}
        </Fab>
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
          <div className={classes.toolbar} />
          <List>
            {/* {AppRoutes.map((route, i) => {
              if (route === null) {
                return <Divider key={i} className={classes.listDivider} />;
              } else if (route.renderInMenu === false) {
                return null;
              }

              return (
                <CustomNavLink key={route.path} to={route.path}>
                  <ListItem button key={route.path} className={classes.listItem}>
                    {route.icon && <ListItemIcon>{<route.icon />}</ListItemIcon>}
                    <ListItemText primary={route.label} />
                  </ListItem>
                </CustomNavLink>
              );
            })} */}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          Content
        </main>
      </div>
    );
  }
}

export default withAuth(AppLayout);
