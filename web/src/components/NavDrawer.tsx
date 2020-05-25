import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import CustomersIcon from "@material-ui/icons/PermContactCalendar";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

const DrawerContents: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbar} />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CustomersIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
    </>
  );
};

interface Props {
  onDrawerToggle: () => void;
  mobileOpen: boolean;
}

const NavDrawer: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { onDrawerToggle, mobileOpen } = props;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="js">
        <Drawer
          container={window.document.body}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={onDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={
            {
              // keepMounted: true, // Better open performance on mobile.
            }
          }
        >
          <DrawerContents />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <DrawerContents />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default NavDrawer;
