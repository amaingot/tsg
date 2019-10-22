import React from "react";
import { Job } from "tsg-shared";
import { MaterialTableProps, Column } from "material-table";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/DoneOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Table from "./Table";
import EditJobModal from "./EditJobModal";
import axios from "../utils/axios";

interface Props extends Partial<MaterialTableProps<Job>> {
  loading?: boolean;
  jobs: Array<Job>;
  reloadData?: () => void;
}

const JobTable: React.FC<Props> = props => {
  const { jobs, loading, reloadData, ...rest } = props;

  const [jobToEdit, setJobToEdit] = React.useState<Job>();
  const [jobToFinish, setJobToFinish] = React.useState<Job>();

  const handleModalClose = (job?: Job) => {
    if (job) {
      reloadData && reloadData();
    }
    setJobToEdit(undefined);
  };

  const handleFinishJob = () => {
    if (!jobToFinish) return;

    const { id } = jobToFinish;
    axios.put(`/jobs/${id}/finish`).then(resp => {
      if (resp.status === 200) {
        setJobToFinish(undefined);
      } else {
        window.Rollbar.error(`Finishing a job failed`, resp.data);
      }
    });
  };

  const defaultColumns: Column<Job>[] = [
    { title: "Name", field: "name" },
    { title: "String", field: "stringName" },
    { title: "Racket", field: "racket" },
    { title: "Tension", field: "tension" },
    { title: "Gauge", field: "gauge" },
    {
      title: "Received On",
      field: "createdAt",
      render: j =>
        j.createdAt ? moment(j.createdAt).format("MMM dd, YY") : "",
      defaultSort: "desc"
    },
    {
      title: "Strung On",
      field: "finishedAt",
      render: j =>
        j.finishedAt ? moment(j.finishedAt).format("MMM dd, YY") : ""
    }
  ];

  return (
    <>
      <Table
        columns={defaultColumns}
        data={jobs}
        isLoading={loading}
        {...rest}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit job",
            onClick: (_e, job) => {
              if (typeof job === "object") {
                setJobToEdit(job as Job);
              }
            }
          },
          (job: Job) => ({
            icon: () => <DoneIcon />,
            tooltip: "Finish job",
            onClick: () => {
              setJobToFinish(job);
            },
            hidden: job.finished === "yes"
          })
        ]}
      />
      <EditJobModal
        job={jobToEdit}
        open={jobToEdit !== undefined}
        onClose={handleModalClose}
      />
      <Dialog
        open={!!jobToFinish}
        onClose={() => setJobToFinish(undefined)}
        aria-labelledby="finish-job-title"
        aria-describedby="finish-job-description"
      >
        <DialogTitle id="finish-job-title">Finish this Job</DialogTitle>
        <DialogContent>
          <DialogContentText id="finish-job-description">
            Are you sure you want to mark this string job as complete and
            notifiy the customer via text message? Make sure you are logged
            under your account so you get the credit.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJobToFinish(undefined)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFinishJob} color="primary" autoFocus>
            Finish and Notify Customer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobTable;
