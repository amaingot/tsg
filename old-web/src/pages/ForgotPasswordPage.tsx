import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../components/Copyright";
import { ApiBaseURL } from "../utils/axios";
import TextField from "../components/TextField";
import emailIsValid from "../utils/emailIsValid";

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ForgotPasswordPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;
  const [email, setEmail] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  const sendCode: React.FormEventHandler = async e => {
    e.preventDefault();
    setError(undefined);

    if (!email || !emailIsValid(email)) {
      setError("Please enter a valid email");
      return;
    }

    const response = await axios({
      url: "/user/forgot-password",
      baseURL: ApiBaseURL,
      method: "POST",
      data: {
        email
      }
    });

    if (response.status !== 200) {
      setError(response.data["message"]);
      window.Rollbar.error(response);
    } else {
      history.push("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} onSubmit={sendCode}>
          <TextField
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Typography color="error" gutterBottom>
            {error}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Code
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/login" variant="body2">
                Remembered your password? Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
