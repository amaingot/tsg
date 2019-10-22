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
import Tooltip from "@material-ui/core/Tooltip";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import CustomersIcon from "@material-ui/icons/PermContactCalendar";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";

import { useUserData } from "../contexts/UserDataContext";
import { UserRoles } from "tsg-shared";
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
    width: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  itemIcon: {
    paddingLeft: theme.spacing(1)
  }
}));

interface ItemProps {
  showTooltip: boolean;
  to: string;
  title: string;
  icon: React.ReactElement;
}

export const DrawerItem: React.FC<ItemProps> = props => {
  const { showTooltip, to, title, icon } = props;
  const classes = useStyles();

  const item = (
    <ListItem component={NavLink} to={to} button>
      <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );

  if (showTooltip) {
    return (
      <Tooltip title={title} placement="right">
        {item}
      </Tooltip>
    );
  }
  return item;
};

interface Props {
  handleDrawerClose: () => void;
  open: boolean;
}

const AppNavDrawer: React.FC<Props> = props => {
  const classes = useStyles();
  const { employee } = useUserData();

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
        <DrawerItem
          title="Dashboard"
          showTooltip={!open}
          to="/app/dashboard"
          icon={<DashboardIcon />}
        />
        <DrawerItem
          title="Jobs"
          showTooltip={!open}
          to="/app/jobs"
          icon={<AssignmentIcon />}
        />
        <DrawerItem
          title="Customers"
          showTooltip={!open}
          to="/app/customers"
          icon={<CustomersIcon />}
        />
        {!!employee && employee.userRole !== UserRoles.Employee && (
          <>
            <DrawerItem
              title="Employees"
              showTooltip={!open}
              to="/app/employees"
              icon={<GroupIcon />}
            />
            <DrawerItem
              title="Reports"
              showTooltip={!open}
              to="/app/reports"
              icon={<BarChartIcon />}
            />
          </>
        )}
      </List>
      <Divider />
      <List>
        <ListSubheader inset>Shortcuts</ListSubheader>
        <DrawerItem
          title="New Customer"
          showTooltip={!open}
          to="/app/customers/create"
          icon={<AddIcon />}
        />
      </List>
    </Drawer>
  );
};

export default AppNavDrawer;
