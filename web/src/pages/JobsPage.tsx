import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { Job } from "tsg-shared";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import JobDetailTablePanel from "../components/JobDetailTablePanel";
import JobTable from "../components/JobTable";
import { useJobs, useLoadJobs } from "../store/hooks";

const useStyles = makeStyles(theme => ({
  actionContainer: {
    position: "absolute",
    right: 0,
    top: 0
  },
  title: {
    position: "relative",
    zIndex: 1
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto"
  }
}));

const JobsPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const { list, loading } = useJobs();
  const loadJobs = useLoadJobs();

  React.useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleRowClick = (
    _event?: React.MouseEvent<Element, MouseEvent> | undefined,
    rowData?: Job | undefined
  ) => {
    if (typeof rowData !== "undefined") {
      history.push(`/app/customers/${rowData.customerId}?jobId=${rowData.id}`);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Jobs
        <div className={classes.actionContainer}>
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
          <JobTable
            jobs={list}
            loading={loading}
            onRowClick={handleRowClick}
            detailPanel={job => <JobDetailTablePanel {...job} />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default JobsPage;
