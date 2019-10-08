import React from "react";
import { RouteComponentProps } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import PhoneTextMask, {
  PhoneMaskInitialValue
} from "../components/PhoneTextMask";
// import axios from "../utils/axios";
// import parsePhoneNum from "../utils/parsePhoneNum";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const CreateCustomerPage: React.FC<RouteComponentProps> = () => {
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

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.paper}>
            <Typography>Basic Info</Typography>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="middleInitial"
              label="Middle Intial"
              name="middleInitial"
              value={middleInitial}
              onChange={e => setMiddleInitial(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="memNumber"
              label="Member Number"
              name="memNumber"
              value={memNumber}
              onChange={e => setmemNumber(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <Typography>Contact Info</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="cell-phone"
              label="Cell Phone"
              name="cell-phone"
              type="tel"
              InputProps={
                {
                  inputComponent: PhoneTextMask
                } as any
              }
              value={cellPhone}
              onChange={e => setCellPhone(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="home-phone"
              label="Home Phone"
              name="home-phone"
              type="tel"
              InputProps={
                {
                  inputComponent: PhoneTextMask
                } as any
              }
              value={homePhone}
              onChange={e => setHomePhone(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="work-phone"
              label="Work Phone"
              name="work-phone"
              type="tel"
              InputProps={
                {
                  inputComponent: PhoneTextMask
                } as any
              }
              value={workPhone}
              onChange={e => setWorkPhone(e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography>Address</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address2"
              label="Address (cont.)"
              name="address2"
              value={address2}
              onChange={e => setAddress2(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="zip"
              label="Postal Code"
              name="zip"
              value={zip}
              onChange={e => setZip(e.target.value)}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreateCustomerPage;
