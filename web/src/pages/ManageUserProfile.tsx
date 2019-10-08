import React from "react";
import { RouteComponentProps } from "react-router";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import PhoneTextMask, {
  PhoneMaskInitialValue
} from "../components/PhoneTextMask";

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

  const [company, setCompany] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [workPhone, setWorkPhone] = React.useState(PhoneMaskInitialValue);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.paper}>
            <Typography>Account Info</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="company"
              label="Company Name"
              name="company"
              value={company}
              onChange={e => setCompany(e.target.value)}
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
            <Button fullWidth variant="outlined" color="primary">
              Save
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <Typography>Billing Info</Typography>
            <Typography>Current Plan: boom</Typography>
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
