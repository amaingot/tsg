import React from "react";
import { RouteComponentProps } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Close";
import yellow from "@material-ui/core/colors/yellow";

import { phoneNumberIsValid } from "../components/PhoneTextMask";
import TextField from "../components/TextField";
import {
  useGetCustomerDetailsQuery,
  useUpdateCustomerMutation,
  CreateOrUpdateCustomerInput,
} from "../graphql/hooks";

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
  fabContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    display: "flex",
  },
  title: {
    position: "relative",
  },
  jobsCartTitle: {
    padding: theme.spacing(2),
  },
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  contentDrawerOpen: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginRight: DRAWER_WIDTH
  },
  highlightedJobRow: {
    background: yellow[50],
  },
}));

const CustomerDetailPage: React.FC<RouteComponentProps<{ id: string }>> = (
  props
) => {
  const { id } = props.match.params;
  const { history } = props;

  const getCustomerResponse = useGetCustomerDetailsQuery({
    variables: {
      id,
      jobsPagination: {},
    },
  });
  const [updateCustomer, updateCustomerResponse] = useUpdateCustomerMutation();
  const classes = useStyles();

  const [error, setError] = React.useState<string>();
  const [editMode, setEditMode] = React.useState(false);

  const [memNum, setMemNumber] = React.useState<string>();
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

  const loading =
    getCustomerResponse.loading ||
    (updateCustomerResponse.called && updateCustomerResponse.loading);
  const data = getCustomerResponse.data?.customer;

  if (data === undefined) {
    return (
      <CircularProgress
        size={64}
        style={{ margin: "4rem auto", display: "block" }}
      />
    );
  }
  const { jobs, ...customer } = data;

  const handleSave: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (customer === undefined) {
      setError("Uh something horribly wrong has happened");
      return;
    }

    const input: CreateOrUpdateCustomerInput = {
      clientId: customer.clientId,
      memNum: customer.memNum,
      firstName: customer.firstName,
      lastName: customer.lastName,
      middleInitial: customer.middleInitial,
      email: customer.email,
      address: customer.address,
      address2: customer.address2,
      city: customer.city,
      zip: customer.zip,
      cellPhone: customer.cellPhone,
      homePhone: customer.homePhone,
      workPhone: customer.workPhone,
    };

    if (memNum !== undefined) input.memNum = memNum;
    if (lastName !== undefined) input.lastName = lastName;
    if (firstName !== undefined) input.firstName = firstName;
    if (middleInitial !== undefined) input.middleInitial = middleInitial;
    if (email !== undefined) input.email = email;
    if (address !== undefined) input.address = address;
    if (address2 !== undefined) input.address2 = address2;
    if (city !== undefined) input.city = city;
    if (zip !== undefined) input.zip = zip;

    if (homePhone && homePhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(homePhone)) {
        input.homePhone = homePhone;
      } else {
        setError("The home phone is not formatted correctly");
        return;
      }
    }
    if (cellPhone && cellPhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(cellPhone)) {
        input.cellPhone = cellPhone;
      } else {
        setError("The cell phone is not formatted correctly");
        return;
      }
    }
    if (workPhone && workPhone.indexOf(" ") !== 1) {
      if (phoneNumberIsValid(workPhone)) {
        input.workPhone = workPhone;
      } else {
        setError("The work phone is not formatted correctly");
        return;
      }
    }
    updateCustomer({
      variables: { id, input },
      refetchQueries: ["ListTodos"],
    })
      .then(() => {
        setEditMode(false);
        history.push("/app/customers");
      })
      .catch((e) => {
        setError(JSON.stringify(e));
      });
  };

  const startEdit = () => {
    setEditMode(true);
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
            <>
              <Fab
                color="primary"
                aria-label="add"
                // onClick={() => setDrawerOpen(true)}
              >
                <AddIcon />
              </Fab>
              <Fab color="primary" aria-label="edit" onClick={startEdit}>
                <EditIcon />
              </Fab>
            </>
          )}
        </div>
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid
        container
        spacing={3}
        // className={drawerOpen ? classes.contentDrawerOpen : classes.content}
        className={classes.content}
      >
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
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                readOnly: !editMode,
              }}
              hide={loading || (!customer.firstName && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="middleInitial"
              label="Middle Initial"
              defaultValue={customer.middleInitial}
              value={middleInitial}
              onChange={(e) => setMiddleInitial(e.target.value)}
              InputProps={{
                readOnly: !editMode,
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
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                readOnly: !editMode,
              }}
              hide={loading || (!customer.lastName && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="memNum"
              label="Member Number"
              defaultValue={customer.memNum}
              value={memNum}
              onChange={(e) => setMemNumber(e.target.value)}
              InputProps={{
                readOnly: !editMode,
              }}
              hide={loading || (!customer.memNum && !editMode)}
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
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                readOnly: !editMode,
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
              onChange={(e) => setCellPhone(e.target.value)}
              InputProps={{
                readOnly: !editMode,
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
              onChange={(e) => setHomePhone(e.target.value)}
              InputProps={{
                readOnly: !editMode,
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
              onChange={(e) => setWorkPhone(e.target.value)}
              InputProps={{
                readOnly: !editMode,
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
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                readOnly: !editMode,
              }}
              hide={loading || (!customer.address && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="address2"
              label="Address (cont.)"
              defaultValue={customer.address2}
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              InputProps={{
                readOnly: !editMode,
              }}
              hide={loading || (!customer.address2 && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="city"
              label="City"
              defaultValue={customer.city}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                readOnly: !editMode,
              }}
              hide={loading || (!customer.city && !editMode)}
            />
            <TextField
              className={classes.textField}
              id="zip"
              label="Postal Code"
              defaultValue={customer.zip}
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              InputProps={{
                readOnly: !editMode,
              }}
              hide={loading || (!customer.zip && !editMode)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {/* <JobTable
            title="Past Jobs"
            jobs={jobs}
            loading={loading}
            options={{ paging: false, search: false }}
          /> */}
        </Grid>
      </Grid>
      {/* <CreateJobDrawer
        onFinish={handleNewJob}
        open={drawerOpen}
        customerId={id}
      /> */}
    </>
  );
};

export default CustomerDetailPage;
