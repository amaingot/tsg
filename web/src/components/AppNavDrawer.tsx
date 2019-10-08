import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import CustomersIcon from "@material-ui/icons/PermContactCalendar";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  }
}));

interface Props {
  handleDrawerClose: () => void;
  open: boolean;
}

const AppNavDrawer: React.FC<Props> = props => {
  const classes = useStyles();
  const { handleDrawerClose, open } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem component={NavLink} to="/app/dashboard" button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={NavLink} to="/app/jobs" button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
        <ListItem component={NavLink} to="/app/customers" button>
          <ListItemIcon>
            <CustomersIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem component={NavLink} to="/app/employees" button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem component={NavLink} to="/app" button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader inset>Shortcuts</ListSubheader>
        <ListItem component={NavLink} to="/app/customers/create" button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New Customer" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppNavDrawer;
