import React from "react";
import clsx from "clsx";
import { RouteComponentProps } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  addButton: {
    position: "absolute",
    right: 0
  },
  title: {
    position: "relative"
  }
}));

const JobsPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Jobs
        <Fab color="primary" aria-label="add" className={classes.addButton}>
          <AddIcon />
        </Fab>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>Jobs</Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>Deposits</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Orders</Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default JobsPage;
