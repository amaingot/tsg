import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { ListJobsResponse, Job } from "tsg-shared";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import axios from "../utils/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const useStyles = makeStyles({
  actionContainer: {
    position: "absolute",
    right: 0,
    top: 0
  },
  title: {
    position: "relative"
  },
  paper: {
    minHeight: "40vh",
    display: "flex"
  }
});

const JobsPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;
  const [jobs, setJobs] = React.useState<Array<Job>>();
  const [hideFinished, setHideFinished] = React.useState(false);

  React.useEffect(() => {
    axios
      .get<ListJobsResponse>(`/jobs/list${hideFinished ? "/finished" : ""}`)
      .then(resp => {
        if (resp.status === 200) {
          setJobs(resp.data.data);
        }
      });
  }, [hideFinished]);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Jobs
        <div className={classes.actionContainer}>
          <FormControlLabel
            control={
              <Switch
                checked={hideFinished}
                onChange={() => setHideFinished(v => !v)}
                value="hideFinished"
                color="primary"
              />
            }
            label="Hide Finished Jobs"
          />
          <Fab
            color="primary"
            aria-label="add"
            component={NavLink}
            to="/app/jobs/create"
          >
            <AddIcon />
          </Fab>
        </div>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {!jobs ? (
              <LoadingSpinner />
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
                        onClick={() =>
                          history.push(
                            `/app/customers/${j.customerId}?jobId=${j.id}`
                          )
                        }
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

export default JobsPage;
