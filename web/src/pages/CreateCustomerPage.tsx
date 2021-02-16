import * as React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Grid, Typography, Fab, Paper } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import TextField from "../components/TextField";
import { useCreateCustomerMutation, CustomerInput } from "../graphql/hooks";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    position: "absolute",
    right: 0,
  },
  title: {
    position: "relative",
  },
}));

const CreateCustomerPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [createCustomer, result] = useCreateCustomerMutation({
    onCompleted: () =>
      history.push(`/app/customers/${result.data?.createCustomer.id}/detail`),
  });
  const { loading, error } = result;

  const [memNum, setMemNumber] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [middleInitial, setMiddleInitial] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [homePhone, setHomePhone] = React.useState("");
  const [cellPhone, setCellPhone] = React.useState("");
  const [workPhone, setWorkPhone] = React.useState("");

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const input: CustomerInput = {
      lastName,
      firstName,
      details: [],
    };

    createCustomer({ variables: { input } });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          New Customer
          <Fab
            type="submit"
            color="primary"
            aria-label="add"
            className={classes.addButton}
          >
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
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="middleInitial"
                label="Middle Intial"
                value={middleInitial}
                onChange={(e) => setMiddleInitial(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                required
                id="lastName"
                label="Last Name"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="memNum"
                label="Member Number"
                value={memNum}
                onChange={(e) => setMemNumber(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="cell-phone"
                label="Cell Phone"
                type="tel"
                value={cellPhone}
                onChange={(e) => setCellPhone(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="home-phone"
                label="Home Phone"
                type="tel"
                value={homePhone}
                onChange={(e) => setHomePhone(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="work-phone"
                label="Work Phone"
                type="tel"
                value={workPhone}
                onChange={(e) => setWorkPhone(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="address2"
                label="Address (cont.)"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="city"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                id="zip"
                label="Postal Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateCustomerPage;
