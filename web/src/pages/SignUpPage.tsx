import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Layout from "../components/Layout";
import { StripeElementChangeEvent } from "@stripe/stripe-js";
import { useSignUpMutation } from "../graphql/hooks";
import { InputBaseComponentProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: 16,
  },
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type StripeComponent =
  | typeof CardNumberElement
  | typeof CardExpiryElement
  | typeof CardCvcElement;

const stripeWrapper = (
  Component: StripeComponent,
  handleChange: (event: StripeElementChangeEvent) => void
) => (props: InputBaseComponentProps) => {
  const { onBlur, onChange, onFocus, ...rest } = props;

  return (
    <Component
      {...rest}
      onBlur={() => onBlur && onBlur({} as any)}
      onFocus={() => onFocus && onFocus({} as any)}
      onChange={handleChange}
      options={{
        placeholder: "",
      }}
    />
  );
};

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const [error, setError] = React.useState<string>();
  const stripe = useStripe();
  const elements = useElements();
  const [companyName, setCompanyName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signUp, signUpResult] = useSignUpMutation();

  React.useEffect(() => {
    if (signUpResult.error) {
      setError(signUpResult.error.message);
    }
  }, [signUpResult]);

  if (stripe === null || elements === null) {
    return <></>;
  }

  // Handle real-time validation errors from the card Element.
  const handleChange = (event: StripeElementChangeEvent) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(undefined);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardNum = elements.getElement(CardNumberElement);
    if (cardNum === null) return;
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardNum,
      billing_details: {
        name: `${firstName} ${lastName} (${companyName})`,
        address: {
          postal_code: zip,
        },
      },
    });

    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(undefined);
      // Send the token to your server.
      // stripeTokenHandler(result.token);
      signUp({
        variables: {
          input: {
            firstName,
            companyName,
            lastName,
            email,
            password,
            paymentMethodId: result.paymentMethod?.id,
          },
        },
      }).catch((e) => {
        setError(JSON.stringify(e));
      });
    }
  };

  return (
    <Layout title="Sign Up">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lname"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="companyName"
                  label="Company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  name="companyName"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="card-number"
                  label="Card Number"
                  helperText="1234 1234 1234 1234"
                  id="card-number"
                  InputProps={{
                    inputComponent: stripeWrapper(
                      CardNumberElement,
                      handleChange
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="card-number"
                  label="Expiration"
                  helperText="MM YY"
                  id="card-number"
                  InputProps={{
                    inputComponent: stripeWrapper(
                      CardExpiryElement,
                      handleChange
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="card-number"
                  label="CVC"
                  id="card-number"
                  InputProps={{
                    inputComponent: stripeWrapper(CardCvcElement, handleChange),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="zip"
                  label="Zip Code"
                  type="number"
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  autoComplete="postal-code"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default SignUpPage;
