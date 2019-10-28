import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import queryString from "query-string";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../components/Copyright";
import { ApiBaseURL } from "../utils/axios";
import TextField from "../components/TextField";

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

interface Props extends RouteComponentProps {
  type?: "INVITE" | "FORGOT_PASSWORD";
}

const ResetPasswordPage: React.FC<Props> = props => {
  const classes = useStyles();
  const { history, type = "FORGOT_PASSWORD" } = props;

  const { search } = props.location;
  const searchValues = queryString.parse(search);
  const { id, code } = searchValues;

  React.useEffect(() => {
    if (typeof id !== "string" || typeof code !== "string") {
      history.push("/forgot-password");
    }
  }, [code, id, history]);

  const [password, setPassword] = React.useState("");
  const [passAgain, setPassAgain] = React.useState("");
  const [error, setError] = React.useState<string>();

  const resetPassword: React.FormEventHandler = async e => {
    e.preventDefault();
    setError(undefined);

    if (password !== passAgain) {
      setError("Password does not match.");
      return;
    }

    const response = await axios({
      url:
        type === "INVITE" ? "/user/accept-invitation" : "/user/reset-password",
      baseURL: ApiBaseURL,
      method: "POST",
      data: {
        id,
        code,
        password
      }
    });

    if (response.status !== 200) {
      setError(response.data["message"]);
      window.Rollbar.error(response);
    } else {
      history.push("/login", { email: response.data.email });
    }
  };

  let title = "Reset Password";
  let buttonText = "Update Password";

  if (type === "INVITE") {
    title = "Create Password";
    buttonText = "Create Account";
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={resetPassword}>
          <TextField
            required
            id="password"
            label="New Password"
            type="password"
            autoComplete="new-password"
            autoFocus
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            required
            id="password-again"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            margin="normal"
            value={passAgain}
            onChange={e => setPassAgain(e.target.value)}
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
            {buttonText}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
