import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Auth, { CognitoUser } from "@aws-amplify/auth";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../components/Copyright";
import { useUserData } from "../contexts/UserDataContext";

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

const SignInPage: React.FC<RouteComponentProps> = props => {
  const { history, location } = props;

  const previousPageEmail =
    !!location.state && !!location.state["email"]
      ? location.state["email"]
      : undefined;
  const classes = useStyles();
  const userData = useUserData();

  const [challenge, setChallenge] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  const [email, setEmail] = React.useState(previousPageEmail || "");
  const [password, setPassword] = React.useState("");

  const [mfaCode, setMfaCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [passwordAgain, setPassAgain] = React.useState("");

  const handleLoginSuccess = async (user: any) => {
    if (user instanceof CognitoUser) {
      user.getUserData(
        (error, userData) =>
          !error &&
          !!userData &&
          window.Rollbar.configure({
            payload: {
              person: {
                id: userData.Username,
                username: (
                  userData.UserAttributes.find(a => a.Name === "email") || {}
                ).Value,
                email: (
                  userData.UserAttributes.find(a => a.Name === "email") || {}
                ).Value
              }
            }
          })
      );
    }
    await userData.reload();
    history.push("/app");
  };

  const handleConfirmUser = async () => {
    setError(undefined);
    try {
      await Auth.confirmSignUp(email, mfaCode);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleNewPassword = async () => {
    if (newPassword === passwordAgain) {
      const user = await Auth.signIn(email, password);

      Auth.completeNewPassword(user, newPassword, { email })
        .then(handleSignIn)
        .catch(e => {
          setError(
            "Uh oh! We seem to have had an error! Please file a support ticket to get help."
          );
          window.Rollbar.error("Complete new password login error", e);
        });
    } else {
      setError("Looks like your passwords don't match!");
    }
  };

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (challenge === "UserNotConfirmedException") {
      await handleConfirmUser();
    }

    if (challenge === "NEW_PASSWORD_REQUIRED") {
      return await handleNewPassword();
    }

    try {
      const user = await Auth.signIn(email, password);

      if (
        user.challengeName === "SMS_MFA" ||
        user.challengeName === "SOFTWARE_TOKEN_MFA"
      ) {
        // You need to get the code from the UI inputs
        // and then trigger the following function with a button click
        setChallenge(user.challengeName);
        setError("Uh oh! Looks like you need to change your password!");
      } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        // You need to get the new password and required attributes from the UI inputs
        // and then trigger the following function with a button click
        // For example, the email and phone_number are required attributes
        setChallenge(user.challengeName);
      } else if (user.challengeName === "MFA_SETUP") {
        window.Rollbar.error("User requires MFA_SETUP", user);
        setError(
          "Uh oh! Looks like your account got into a weird state. Please file a support ticket to get help."
        );
      } else {
        handleLoginSuccess(user);
      }
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
        setChallenge(err.code);
        setError(
          "Looks like you didn't finish the confirmation step when signing up. Check your email and enter the verification code above."
        );

        Auth.resendSignUp(email);
      } else if (err.code === "PasswordResetRequiredException") {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
        setError(
          'Looks like your password has been reset. Please click "Forgot Password" below.'
        );
      } else if (err.code === "NotAuthorizedException") {
        // The error happens when the incorrect password is provided
        setError("Uh oh! Wrong password! Want to try again?");
      } else if (err.code === "UserNotFoundException") {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        setError("Hmmm! Interesting!? I can't find you in my system!");
      } else {
        setError(
          "Woah! We've never seen this before! Please file a support ticket to get help."
        );
        window.Rollbar.error("Unexpected user login error", err);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSignIn}>
          {!challenge && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
              />
            </>
          )}

          {(challenge === "SMS_MFA" ||
            challenge === "UserNotConfirmedException" ||
            challenge === "SOFTWARE_TOKEN_MFA") && (
            <>
              <Typography>
                We just sent you a code message. Type it below to log in.
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mfa-code"
                label="Verification Code"
                name="mfa-code"
                autoFocus
                value={mfaCode}
                onChange={e => setMfaCode(e.target.value)}
              />
            </>
          )}

          {challenge === "NEW_PASSWORD_REQUIRED" && (
            <>
              <Typography>
                Looks like we need to you to change your password!
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="new-password"
                label="New Password"
                type="password"
                name="new-password"
                autoFocus
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirm-new-password"
                label="Confirm New Password"
                type="password"
                id="confirm-new-password"
                value={passwordAgain}
                onChange={e => setPassAgain(e.target.value)}
              />
            </>
          )}

          {error && <Typography color="error">{error}</Typography>}
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
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
              >
                Forgot password?
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

export default SignInPage;
