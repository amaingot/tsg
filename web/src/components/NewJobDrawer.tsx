import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useRightDrawerContext } from "../contexts/RightDrawerContext";

export const DRAWER_WIDTH = 260;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(2)
  }
}));

interface Props {
  open: boolean;
  customerId: string;
}

const NewJobDrawer: React.FC<Props> = props => {
  const { setDrawerOpen } = useRightDrawerContext();
  const { open } = props;
  const classes = useStyles();

  React.useEffect(() => {
    if (open) setDrawerOpen(DRAWER_WIDTH);
    else setDrawerOpen(undefined);

    return () => setDrawerOpen(undefined);
  }, [open, setDrawerOpen]);

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}></div>
        <Typography variant="h6" gutterBottom>
          New Customer Job
        </Typography>
        <Button>Cancel</Button>
        <Button>Save</Button>
      </Drawer>
    </>
  );
};

export default NewJobDrawer;
