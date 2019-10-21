import React from "react";
import { RouteComponentProps } from "react-router";
import clsx from "clsx";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import axios from "../utils/axios";
import { ListJobsResponse, Job, JobsBreakdownResponse } from "tsg-shared";
import LoadingSpinner from "../components/LoadingSpinner";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    minHeight: 240
  },
  cardTitle: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  },
  jobCount: {
    flexGrow: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  graphContainer: {
    flexGrow: 10
  }
}));

const DashboardPage: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [jobs, setJobs] = React.useState<Array<Job>>();
  const [monthCounts, setMonthCounts] = React.useState<
    Array<{ month: string; count: number }>
  >([]);

  React.useEffect(() => {
    axios.get<JobsBreakdownResponse>("/jobs/count-breakdown").then(resp => {
      if (resp.status === 200) {
        let temp: Array<{ month: string; count: number }> = [];
        const { byMonth } = resp.data.data;
        Object.keys(byMonth).forEach(k => {
          temp.push({ ...byMonth[k] });
        });
        setMonthCounts(temp);
      }
    });
  }, []);

  React.useEffect(() => {
    axios.get<ListJobsResponse>("/jobs/list/pending").then(resp => {
      if (resp.status === 200) {
        setJobs(resp.data.data);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Typography variant="h6">Jobs Completed by Month</Typography>
            <ResponsiveContainer className={classes.graphContainer}>
              <BarChart data={monthCounts}>
                <XAxis dataKey="month" />
                <Tooltip />
                <Bar dataKey="count" fill="#3f51b5" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Typography variant="h6">Pending Jobs</Typography>
            <div className={classes.jobCount}>
              <Typography variant="h1" align="center">
                {jobs ? jobs.length : <LoadingSpinner size="sm" />}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.fixedHeight}>
            <Typography variant="h6" className={classes.cardTitle}>
              Jobs Queue
            </Typography>
            {!jobs ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Racket</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>Tension</TableCell>
                    <TableCell>Guage</TableCell>
                    <TableCell>Strung On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs &&
                    jobs.map(j => (
                      <TableRow
                        key={j.id}
                        onClick={() => history.push(`/app/jobs/${j.id}`)}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {j.name}
                        </TableCell>
                        <TableCell>{j.stringName}</TableCell>
                        <TableCell>{j.racket}</TableCell>
                        <TableCell>{j.tension}</TableCell>
                        <TableCell>{j.gauge}</TableCell>
                        <TableCell>
                          {moment(j.finishedAt).format("MMM d, YY")}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardPage;
