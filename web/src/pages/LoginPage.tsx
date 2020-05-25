import React from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import auth from "../utils/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { loggedIn } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/app");
    }
  }, [loggedIn, history]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    try {
      auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      setError(JSON.stringify(e));
    }
  };

  return (
    <Layout size="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="username"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                checked={rememberMe}
                onChange={(r) => setRememberMe(r.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Typography color="error">{error}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={() => history.push("/forgot-password")}
              >
                {"Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => history.push("/sign-up")}
              >
                {"Don't have an account? Sign Up!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
