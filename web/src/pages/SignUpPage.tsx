import React from "react";
import { RouteComponentProps } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../components/Copyright";
import parsePhoneNum from "../utils/parsePhoneNum";
import { ApiBaseURL } from "../utils/axios";
import PhoneTextMask, {
  PhoneMaskInitialValue
} from "../components/PhoneTextMask";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUpPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passAgain, setPassAgain] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [cellPhone, setCellPhone] = React.useState(PhoneMaskInitialValue);
  const [workPhone, setWorkPhone] = React.useState(PhoneMaskInitialValue);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const submit: React.FormEventHandler = async e => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    if (password !== passAgain) {
      setError("Passwords do not match, please try again");
    } else if (cellPhone.trim().length < 14) {
      setError("Please fill out your cell phone number");
    } else if (workPhone.trim().length < 14) {
      setError("Please fill out your work phone number");
    } else {
      const response = await axios({
        url: "/signup",
        baseURL: ApiBaseURL,
        method: "POST",
        data: {
          email,
          password,
          firstName,
          lastName,
          companyName: company,
          cellPhone: parsePhoneNum(cellPhone),
          workPhone: parsePhoneNum(workPhone)
        }
      });
      if (response.status !== 200) {
        setError(response.data["message"] || "Oops! There is something wrong!");
        window.Rollbar.error(response);
      } else {
        history.push("/signup/confirm", { email });
      }
    }

    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password-again"
                label="Confirm Password"
                type="password"
                id="password-again"
                autoComplete="new-password"
                value={passAgain}
                onChange={e => setPassAgain(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUpPage;
