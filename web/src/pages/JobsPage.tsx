import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { ListJobsResponse, Job } from "tsg-shared";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Table, { Column } from "../components/Table";
import axios from "../utils/axios";
import JobDetailTablePanel from "../components/JobDetailTablePanel";

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

const JobsPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;
  const [jobs, setJobs] = React.useState<Array<Job>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get<ListJobsResponse>("/jobs/list").then(resp => {
      if (resp.status === 200) {
        setJobs(resp.data.data);
        setLoading(false);
      }
    });
  }, []);

  const columns: Column<Job>[] = [
    { title: "Name", field: "name" },
    { title: "String", field: "stringName" },
    { title: "Racket", field: "racket" },
    { title: "Tension", field: "tension" },
    { title: "Gauge", field: "gauge" },
    {
      title: "Strung On",
      field: "finishedAt",
      render: j => moment(j.finishedAt).format("MMM d, YY"),
      defaultSort: "desc"
    }
  ];

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
          <Table
            columns={columns}
            data={jobs}
            isLoading={loading}
            onRowClick={handleRowClick}
            detailPanel={job => <JobDetailTablePanel {...job} />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default JobsPage;
