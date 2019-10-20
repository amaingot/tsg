import React from "react";
import { RouteComponentProps } from "react-router";
import {
  Customer,
  GetCustomerResponse,
  Job,
  UpdateCustomerRequest,
  UpdateCustomerResponse
} from "tsg-shared";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { phoneNumberIsValid } from "../components/PhoneTextMask";
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
  fabContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    display: "flex"
  },
  title: {
    position: "relative"
  },
  jobsCartTitle: {
    padding: theme.spacing(2)
  }
}));

const CustomerDetailPage: React.FC<
  RouteComponentProps<{ id: string }>
> = props => {
  const { id } = props.match.params;
  const { history } = props;
  const classes = useStyles();

  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState(true);

  const [customer, setCustomer] = React.useState<Partial<Customer>>({});
  const [jobs, setJobs] = React.useState<Array<Job>>([]);
  const [editMode, setEditMode] = React.useState(false);

  const [memNumber, setmemNumber] = React.useState<string>();
  const [lastName, setLastName] = React.useState<string>();
  const [firstName, setFirstName] = React.useState<string>();
  const [middleInitial, setMiddleInitial] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [address, setAddress] = React.useState<string>();
  const [address2, setAddress2] = React.useState<string>();
  const [city, setCity] = React.useState<string>();
  const [zip, setZip] = React.useState<string>();
  const [homePhone, setHomePhone] = React.useState<string>();
  const [cellPhone, setCellPhone] = React.useState<string>();
  const [workPhone, setWorkPhone] = React.useState<string>();

  React.useEffect(() => {
    setLoading(true);
    axios.get<GetCustomerResponse>(`/customers/${id}/detail`).then(resp => {
      if (resp.status === 200) {
        const { data } = resp.data;
        setCustomer(data.customer);
        setJobs(data.jobs);
      } else {
        setError("Uh oh! There seems to be an error!");
        window.Rollbar.error(
          "Fetching customer details resulted in this error: " +
            resp.status +
            " " +
            resp.statusText,
          resp.data
        );
      }
      setLoading(false);
    });
  }, [id]);

  const handleSave: React.FormEventHandler = async e => {
    setLoading(true);
    e.preventDefault();

    if (customer === undefined) {
      setError("Uh something horribly wrong has happend");
      window.Rollbar.error("No customer on the customer detail page");
      return;
    }

    const request: UpdateCustomerRequest = {
      data: customer
    };

    if (memNumber !== undefined) request.data.memNumber = memNumber;
    if (lastName !== undefined) request.data.lastName = lastName;
    if (firstName !== undefined) request.data.firstName = firstName;
    if (middleInitial !== undefined) request.data.middleInitial = middleInitial;
    if (email !== undefined) request.data.email = email;
    if (address !== undefined) request.data.address = address;
    if (address2 !== undefined) request.data.address2 = address2;
    if (city !== undefined) request.data.city = city;
    if (zip !== undefined) request.data.zip = zip;

    if (homePhone && homePhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(homePhone)) {
        request.data.homePhone = homePhone;
      } else {
        setError("The home phone is not formatted correctly");
        setLoading(false);
        return;
      }
    }
    if (cellPhone && cellPhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(cellPhone)) {
        request.data.cellPhone = cellPhone;
      } else {
        setError("The cell phone is not formatted correctly");
        setLoading(false);
        return;
      }
    }
    if (workPhone && workPhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(workPhone)) {
        request.data.workPhone = workPhone;
      } else {
        setError("The work phone is not formatted correctly");
        setLoading(false);
        return;
      }
    }

    const response = await axios.post<UpdateCustomerResponse>(
      `/customers/${id}/update`,
      request
    );

    if (response.status === 200) {
      history.push("/app/customers");
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Customer Detail
        <div className={classes.fabContainer}>
          {editMode ? (
            <>
              <Fab
                color="primary"
                aria-label="edit"
                onClick={() => setEditMode(false)}
              >
                <CancelIcon />
              </Fab>
              <Fab color="primary" aria-label="save" onClick={handleSave}>
                <SaveIcon />
              </Fab>
            </>
          ) : (
            <Fab
              color="primary"
              aria-label="edit"
              onClick={() => setEditMode(true)}
            >
              <EditIcon />
            </Fab>
          )}
        </div>
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="h6">
              Basic Info
            </Typography>
            <TextField
              className={classes.textField}
              autoComplete="fname"
              required
              id="firstName"
              label="First Name"
              autoFocus
              defaultValue={customer.firstName}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.firstName && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="middleInitial"
              label="Middle Intial"
              defaultValue={customer.middleInitial}
              value={middleInitial}
              onChange={e => setMiddleInitial(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.middleInitial && !editMode)}
            />
            <TextField
              className={classes.textField}
              required
              id="lastName"
              label="Last Name"
              autoComplete="lname"
              defaultValue={customer.lastName}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.lastName && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="memNumber"
              label="Member Number"
              defaultValue={customer.memNumber}
              value={memNumber}
              onChange={e => setmemNumber(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.memNumber && !editMode)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="h6">
              Contact Info
            </Typography>
            <TextField
              className={classes.textField}
              id="email"
              label="Email Address"
              autoComplete="email"
              defaultValue={customer.email}
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.email && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="cell-phone"
              label="Cell Phone"
              type="tel"
              defaultValue={customer.cellPhone}
              value={cellPhone}
              onChange={e => setCellPhone(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.cellPhone && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="home-phone"
              label="Home Phone"
              type="tel"
              defaultValue={customer.homePhone}
              value={homePhone}
              onChange={e => setHomePhone(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.homePhone && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="work-phone"
              label="Work Phone"
              type="tel"
              defaultValue={customer.workPhone}
              value={workPhone}
              onChange={e => setWorkPhone(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.workPhone && !editMode)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="h6">
              Address
            </Typography>
            <TextField
              className={classes.textField}
              id="address"
              label="Address"
              defaultValue={customer.address}
              value={address}
              onChange={e => setAddress(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.address && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="address2"
              label="Address (cont.)"
              defaultValue={customer.address2}
              value={address2}
              onChange={e => setAddress2(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.address2 && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="city"
              label="City"
              defaultValue={customer.city}
              value={city}
              onChange={e => setCity(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.city && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="zip"
              label="Postal Code"
              defaultValue={customer.zip}
              value={zip}
              onChange={e => setZip(e.target.value)}
              InputProps={{
                readOnly: !editMode
              }}
              hide={loading || (!customer.zip && !editMode)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography
              gutterBottom
              variant="h6"
              className={classes.jobsCartTitle}
            >
              Past Jobs
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Racket</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Tension</TableCell>
                  <TableCell>Guage</TableCell>
                  <TableCell>Strung On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs &&
                  jobs.map(j => (
                    <TableRow key={j.id} hover>
                      <TableCell component="th" scope="row">
                        {j.name}
                      </TableCell>
                      <TableCell>{j.stringName}</TableCell>
                      <TableCell>{j.racket}</TableCell>
                      <TableCell>{j.tension}</TableCell>
                      <TableCell>{j.gauge}</TableCell>
                      <TableCell>
                        {moment(j.finishedAt).format("MMM d, YY")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerDetailPage;
