import React from 'react';
import { RouteComponentProps } from 'react-router';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const EmployeesPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>Employees</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            Employees
        </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            Deposits
        </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Orders
        </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );

};

export default EmployeesPage;