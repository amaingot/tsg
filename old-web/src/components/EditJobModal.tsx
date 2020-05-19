import React from "react";
import { Job, UpdateJobResponse, UpdateJobRequest } from "tsg-shared";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import TextField from "./TextField";
import axios from "../utils/axios";

interface Props {
  job?: Job;
  open: boolean;
  onClose: (job?: Job) => void;
}

const EditJobModal: React.FC<Props> = props => {
  const { job, open, onClose } = props;

  const [name, setName] = React.useState<string>();
  const [stringName, setStringName] = React.useState<string>();
  const [racket, setRacket] = React.useState<string>();
  const [tension, setTension] = React.useState<string>();
  const [gauge, setGauge] = React.useState<string>();

  React.useEffect(() => {
    setName(!!job ? job.name : undefined);
    setStringName(!!job ? job.stringName : undefined);
    setRacket(!!job ? job.racket : undefined);
    setTension(!!job ? job.tension : undefined);
    setGauge(!!job ? job.gauge : undefined);
  }, [job]);

  const handleSave = async () => {
    if (!job) return;

    const request: UpdateJobRequest = {
      data: {
        customerId: job.customerId,
        name,
        stringName,
        racket,
        tension,
        gauge
      }
    };

    const response = await axios.post<UpdateJobResponse>(
      `/jobs/${job.id}/update`,
      request
    );

    if (response.status === 200) {
      onClose();
    }
  };

  const handleCancel = () => {
    setName("");
    setStringName("");
    setRacket("");
    setTension("");
    setGauge("");
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => onClose()}
        aria-labelledby="edit-job-modal"
      >
        <DialogTitle id="edit-job-modal">Edit Job</DialogTitle>
        <DialogContent>
          {!!job && (
            <>
              <TextField
                id="name"
                withBottomGutter
                label="Name"
                defaultValue={job.name}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <TextField
                id="stringName"
                withBottomGutter
                label="String"
                defaultValue={job.stringName}
                value={stringName}
                onChange={e => setStringName(e.target.value)}
              />
              <TextField
                id="racket"
                withBottomGutter
                label="Racket"
                defaultValue={job.racket}
                value={racket}
                onChange={e => setRacket(e.target.value)}
              />
              <TextField
                id="tension"
                withBottomGutter
                label="Tension"
                defaultValue={job.tension}
                value={tension}
                onChange={e => setTension(e.target.value)}
              />
              <TextField
                id="gauge"
                withBottomGutter
                label="Gauge"
                defaultValue={job.gauge}
                value={gauge}
                onChange={e => setGauge(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditJobModal;
