import React from "react";
import { Job, CreateJobRequest, CreateJobResponse } from "tsg-shared";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";

import TextField from "./TextField";
import { useRightDrawerContext } from "../contexts/RightDrawerContext";
import axios from "../utils/axios";

export const DRAWER_WIDTH = 260;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(2)
  },
  buttons: {
    marginBottom: theme.spacing(2)
  }
}));

interface Props {
  onFinish: (job?: Job) => void;
  customerId?: string;
  open: boolean;
}

const CreateCustomerPage: React.FC<Props> = props => {
  const { onFinish, customerId, open } = props;
  const { setDrawerOpen } = useRightDrawerContext();

  React.useEffect(() => {
    if (open) setDrawerOpen(DRAWER_WIDTH);
    else setDrawerOpen(undefined);

    return () => setDrawerOpen(undefined);
  }, [open, setDrawerOpen]);

  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [stringName, setStringName] = React.useState("");
  const [racket, setRacket] = React.useState("");
  const [tension, setTension] = React.useState("");
  const [gauge, setGauge] = React.useState("");

  React.useEffect(() => {
    setName("");
    setStringName("");
    setRacket("");
    setTension("");
    setGauge("");
  }, [customerId]);

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    setLoading(true);

    if (!customerId) {
      return;
    }

    const newJob: CreateJobRequest = {
      data: {
        customerId
      }
    };

    if (name !== "") newJob.data.name = name;
    if (stringName !== "") newJob.data.stringName = stringName;
    if (racket !== "") newJob.data.racket = racket;
    if (tension !== "") newJob.data.tension = tension;
    if (gauge !== "") newJob.data.gauge = gauge;

    axios.post<CreateJobResponse>("/jobs/create", newJob).then(resp => {
      if (resp.status === 200) {
        setLoading(false);
        onFinish(resp.data.data);
      }
    });
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}></div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          New Customer Job
        </Typography>
        <Typography gutterBottom>Basic Info</Typography>
        <TextField
          disabled={loading}
          withBottomGutter
          id="name"
          label="Name"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Typography variant="subtitle1" gutterBottom>
          Racket Info
        </Typography>
        <TextField
          disabled={loading}
          withBottomGutter
          id="racket"
          label="Racket"
          value={racket}
          onChange={e => setRacket(e.target.value)}
        />
        <Typography variant="subtitle1" gutterBottom>
          String Info
        </Typography>
        <TextField
          disabled={loading}
          withBottomGutter
          id="stringName"
          label="String Name"
          value={stringName}
          onChange={e => setStringName(e.target.value)}
        />
        <TextField
          disabled={loading}
          withBottomGutter
          id="tension"
          label="Tension"
          value={tension}
          onChange={e => setTension(e.target.value)}
        />
        <TextField
          disabled={loading}
          withBottomGutter
          id="gauge"
          label="Gauge"
          value={gauge}
          onChange={e => setGauge(e.target.value)}
        />
        <Button
          className={classes.buttons}
          fullWidth
          variant="contained"
          onClick={() => onFinish()}
        >
          Cancel
        </Button>
        <Button
          className={classes.buttons}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Create Job
        </Button>
      </form>
    </Drawer>
  );
};

export default CreateCustomerPage;
