import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MenuIcon from "@material-ui/icons/Menu";
import HelpIcon from "@material-ui/icons/Help";
import AccountIcon from "@material-ui/icons/AccountCircle";
import Auth from "@aws-amplify/auth";
import { useUserData } from "../contexts/UserDataContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  }
}));

interface Props {
  handleDrawerOpen: () => void;
  drawerOpen: boolean;
}

const AppNavBar: React.FC<Props> = props => {
  const userData = useUserData();
  const classes = useStyles();
  const { handleDrawerOpen, drawerOpen } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    window.Rollbar.configure({
      payload: {
        person: null
      }
    });
    await Auth.signOut();
    await userData.reload();
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(
            classes.menuButton,
            drawerOpen && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Tennis Shop Guru
        </Typography>
        <IconButton color="inherit" component={NavLink} to="/app/support">
          <HelpIcon />
        </IconButton>
        <IconButton color="inherit" aria-haspopup="true" onClick={handleClick}>
          <AccountIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            component={NavLink}
            to="/app/settings/user"
            onClick={handleClose}
          >
            User Settings
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/app/settings/account"
            onClick={handleClose}
          >
            Account Settings
          </MenuItem>
          <MenuItem component={NavLink} to="/" onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
