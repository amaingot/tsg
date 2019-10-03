import React from "react";
import { RouteComponentProps } from "react-router";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "../utils/axios";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const DashboardPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [response, setResponse] = React.useState("");

  const callApi = async () => {
    const resp = await axios({
      method: "POST",
      url: "/signup"
    });
    console.log(resp);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>Chart</Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>Deposits</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            Orders
            <Button onClick={callApi}>Call API</Button>
            {response}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardPage;
