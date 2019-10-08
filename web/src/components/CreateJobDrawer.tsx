import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";

import axios from "../utils/axios";

const useStyles = makeStyles(theme => ({
  drawer: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

interface Props {
  onClose: () => void;
  customerId?: string;
}

const CreateCustomerPage: React.FC<Props> = props => {
  const { onClose, customerId } = props;
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [stringName, setStringName] = React.useState("");
  const [racket, setRacket] = React.useState("");
  const [tension, setTension] = React.useState("");
  const [gauge, setGauge] = React.useState("");
  const [recievedAt, setRecievedAt] = React.useState("");
  const [finishedAt, setFinishedAt] = React.useState("");

  React.useEffect(() => {
    setName("");
    setStringName("");
    setRacket("");
    setTension("");
    setGauge("");
    setRecievedAt("");
    setFinishedAt("");
  }, [customerId]);

  return (
    <Drawer
      anchor="right"
      className={classes.drawer}
      open={!!customerId}
      onClose={onClose}
    >
      <form>
        <Typography variant="h4" gutterBottom>
          Add Customer Job
        </Typography>
        <Typography gutterBottom>Basic Info</Typography>
        <TextField
          name="name"
          variant="outlined"
          fullWidth
          id="name"
          label="Name"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          required
          id="recievedAt"
          label="Recieved At"
          name="recievedAt"
          value={recievedAt}
          onChange={e => setRecievedAt(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          id="finishedAt"
          label="Finished At"
          name="finishedAt"
          value={finishedAt}
          onChange={e => setFinishedAt(e.target.value)}
        />
        <Typography gutterBottom>Racket Info</Typography>
        <TextField
          variant="outlined"
          fullWidth
          id="stringName"
          label="String Name"
          name="stringName"
          value={stringName}
          onChange={e => setStringName(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          id="racket"
          label="Racket"
          name="racket"
          value={racket}
          onChange={e => setRacket(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          id="tension"
          label="Tension"
          name="tension"
          value={tension}
          onChange={e => setTension(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          id="gauge"
          label="Gauge"
          name="gauge"
          value={gauge}
          onChange={e => setGauge(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Create Job
        </Button>
      </form>
    </Drawer>
  );
};

export default CreateCustomerPage;
