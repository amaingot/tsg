import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../components/Copyright";
import { ApiBaseURL } from "../utils/axios";

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

interface Props extends RouteComponentProps {
  email: string;
}

const SignUpConfirmPage: React.FC<Props> = props => {
  const classes = useStyles();
  const { history, email } = props;

  React.useEffect(() => {
    if (!email) {
      history.push("/login");
    }
  }, [history, email]);

  const [code, setCode] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const submit: React.FormEventHandler = async e => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    const response = await axios({
      url: "/signup/confirm",
      baseURL: ApiBaseURL,
      method: "POST",
      data: {
        email,
        code
      }
    });
    if (response.status !== 200) {
      setError(response.data["message"] || "Oops! There is something wrong!");
      window.Rollbar.error(response);
    } else {
      history.push("/login", { email });
    }

    setLoading(false);
  };

  const resendCode = async () => {
    setLoading(true);
    setError(undefined);

    const response = await axios({
      url: "/signup/resend",
      baseURL: ApiBaseURL,
      method: "POST",
      data: {
        email
      }
    });

    if (response.status !== 200) {
      setError(response.data["message"] || "Oops! There is something wrong!");
      window.Rollbar.error(response);
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
          Confirm sign up
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="code"
                label="Verification Code"
                name="code"
                value={code}
                autoFocus
                onChange={e => setCode(e.target.value)}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={loading}
            onClick={resendCode}
          >
            Resend Verification Code
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Confirm Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUpConfirmPage;
