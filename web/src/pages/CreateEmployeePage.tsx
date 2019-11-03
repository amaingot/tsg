import React from "react";
import { RouteComponentProps } from "react-router";
import { UserRoles, CreateEmployeeRequest } from "tsg-shared";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { phoneNumberIsValid, parsePhoneNum } from "../components/PhoneTextMask";
import axios from "../utils/axios";
import TextField from "../components/TextField";
import { useUserData } from "../contexts/UserDataContext";

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

const CreateEmployeePage: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const classes = useStyles();
  const userData = useUserData();

  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cellPhone, setCellPhone] = React.useState("");
  const [userRole, setUserRole] = React.useState<UserRoles>(UserRoles.Employee);

  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const handleSubmit: React.FormEventHandler = async e => {
    setLoading(true);
    e.preventDefault();

    if (!phoneNumberIsValid(cellPhone)) {
      setError("The cell phone is not formatted correctly");
      setLoading(false);
      return;
    }
    if (!userData.client) {
      history.push("/");
      return;
    }

    if (!userRole) {
      setError("Please select a user role");
      setLoading(false);
      return;
    }

    const data: CreateEmployeeRequest = {
      data: {
        lastName,
        firstName,
        email,
        cellPhone: parsePhoneNum(cellPhone),
        userRole,
        clientId: userData.client.id
      }
    };

    const response = await axios.post("/employees/create", data);

    if (response.status === 200) {
      history.push("/app/employees");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          New Employee
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
                onChange={e => setFirstName(e.target.value)}
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
              <FormControl required variant="outlined">
                <InputLabel ref={inputLabel} htmlFor="user-role">
                  User Role
                </InputLabel>
                <Select
                  value={userRole}
                  onChange={e => setUserRole(e.target.value as UserRoles)}
                  labelWidth={labelWidth}
                  inputProps={{
                    id: "user-role"
                  }}
                >
                  <MenuItem value={UserRoles.AccountAdmin}>
                    Administrator
                  </MenuItem>
                  <MenuItem value={UserRoles.Employee}>Employee</MenuItem>
                </Select>
              </FormControl>
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
                required
                id="email"
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                disabled={loading}
                className={classes.textField}
                required
                id="cell-phone"
                label="Cell Phone"
                type="tel"
                value={cellPhone}
                onChange={e => setCellPhone(e.target.value)}
              />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default CreateEmployeePage;
