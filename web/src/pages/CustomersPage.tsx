import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router';
import axios from '../utils/axios';

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

const CustomersPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: '/customers'
    })
  })

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>Customers</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            Customers
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

export default CustomersPage;