import React from "react";
import { RouteComponentProps } from "react-router";
import { NewCustomer } from "tsg-shared";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";

import {
  PhoneMaskInitialValue,
  phoneNumberIsValid
} from "../components/PhoneTextMask";
import axios from "../utils/axios";
import TextField from "../components/TextField";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  addButton: {
    position: "absolute",
    right: 0
  },
  title: {
    position: "relative"
  }
}));

const CreateCustomerPage: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const classes = useStyles();

  const [memNumber, setmemNumber] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [middleInitial, setMiddleInitial] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [homePhone, setHomePhone] = React.useState(PhoneMaskInitialValue);
  const [cellPhone, setCellPhone] = React.useState(PhoneMaskInitialValue);
  const [workPhone, setWorkPhone] = React.useState(PhoneMaskInitialValue);

  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit: React.FormEventHandler = async e => {
    setLoading(true);
    e.preventDefault();

    const newCust: NewCustomer = {
      memNumber,
      lastName,
      firstName,
      middleInitial,
      email,
      address,
      address2,
      city,
      zip
    };

    if (homePhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(homePhone)) {
        newCust.homePhone = homePhone;
      } else {
        setError("The home phone is not formatted correctly");
        setLoading(false);
        return;
      }
    } else if (cellPhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(cellPhone)) {
        newCust.cellPhone = cellPhone;
      } else {
        setError("The cell phone is not formatted correctly");
        setLoading(false);
        return;
      }
    } else if (workPhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(workPhone)) {
        newCust.workPhone = workPhone;
      } else {
        setError("The work phone is not formatted correctly");
        setLoading(false);
        return;
      }
    }

    const response = await axios({
      url: "/customers/create",
      method: "POST",
      data: newCust
    });

    if (response.status === 200) {
      history.push("/app/customers");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          New Customer
          <Fab color="primary" aria-label="add" className={classes.addButton}>
            <SaveIcon />
          </Fab>
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h6">
                Basic Info
              </Typography>
              <TextField
                disabled={loading}
                className={classes.textField}
                autoComplete="fname"
                required
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="middleInitial"
                label="Middle Intial"
                value={middleInitial}
                onChange={e => setMiddleInitial(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                required
                id="lastName"
                label="Last Name"
                autoComplete="lname"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="memNumber"
                label="Member Number"
                value={memNumber}
                onChange={e => setmemNumber(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h6">
                Contact Info
              </Typography>
              <TextField
                disabled={loading}
                className={classes.textField}
                id="email"
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="cell-phone"
                label="Cell Phone"
                type="tel"
                value={cellPhone}
                onChange={e => setCellPhone(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="home-phone"
                label="Home Phone"
                type="tel"
                value={homePhone}
                onChange={e => setHomePhone(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="work-phone"
                label="Work Phone"
                type="tel"
                value={workPhone}
                onChange={e => setWorkPhone(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h6">
                Address
              </Typography>
              <TextField
                disabled={loading}
                className={classes.textField}
                id="address"
                label="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="address2"
                label="Address (cont.)"
                value={address2}
                onChange={e => setAddress2(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="city"
                label="City"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="zip"
                label="Postal Code"
                value={zip}
                onChange={e => setZip(e.target.value)}
              />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default CreateCustomerPage;
