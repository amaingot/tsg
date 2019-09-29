import * as React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormField from '../components/FormField';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

type FormKey = 'firstName' | 'lastName' | 'email' | 'phone' | 'password' | 'passwordAgain';


interface Props {
  loading: boolean;
  submit: (f: any) => void;
  error?: string;
}

const SignUpForm: React.FC<Props> = props => {
  const classes = useStyles();
  const { loading, submit, error } = props;

  const [firstName, setFirstName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState<string>();

  const [lastName, setLastName] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState<string>();

  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState<string>();

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState<string>();

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState<string>();

  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [passwordAgainError, setPasswordAgainError] = React.useState<string>();

  const hasNoError = !firstNameError || !lastNameError || !phoneError || !emailError || !passwordError || !passwordAgainError;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (hasNoError) {
      submit({
        firstName,
        lastName,
        phone,
        email,
        password,
        passwordAgain,
      });
    }
  };

  React.useEffect(() => {
    if (!phone && phone.match(/^\+?[1-9]\d{10,14}$/) === null) {
      setPhoneError('You must enter your phone number. Example: +15557770000');
    } else {
      setPhoneError(undefined);
    }
  }, [phone])

  React.useEffect(() => {
    if (!lastName) {
      setLastNameError('You must enter your last name.');
    } else {
      setLastNameError(undefined);
    }
  }, [lastName])


  React.useEffect(() => {
    if (!firstName) {
      setFirstNameError('You must enter your first name.');
    } else {
      setFirstNameError(undefined);
    }
  }, [firstName])

  React.useEffect(() => {
    if (
      email &&
      email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ===
      null
    ) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError(undefined);
    }
  }, [email]);

  React.useEffect(() => {
    if (password && password.length < 8) {
      setPasswordError('Your password must be longer than eight characters.');
    } else {
      setPasswordError(undefined);
    }

    if (
      password &&
      passwordAgain &&
      password !== passwordAgain
    ) {
      setPasswordAgainError('You must enter the exact same password twice.');
    } else {
      setPasswordAgainError(undefined);
    }

  }, [password, passwordAgain]);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormField
        key="firstName"
        id="firstName"
        label="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        error={firstNameError}
        disabled={loading}
        autoFocus={true}
        required={true}
      />
      <FormField
        key="lastName"
        id="lastName"
        label="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        error={lastNameError}
        disabled={loading}
        required={true}
      />
      <FormField
        key="phone"
        id="phone"
        label="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        error={phoneError}
        disabled={loading}
        required={true}
      />
      <FormField
        key="email"
        id="email"
        label="Email Address"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={emailError}
        disabled={loading}
        required={true}
      />
      <FormField
        key="password"
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={passwordError}
        disabled={loading}
        required={true}
      />
      <FormField
        key="passwordAgain"
        id="passwordAgain"
        label="Confirm Password"
        type="password"
        value={passwordAgain}
        onChange={e => setPasswordAgain(e.target.value)}
        error={passwordAgainError}
        disabled={loading}
        required={true}
      />
      <Typography color="error" variant="body1" component="p">
        {error ? `Error: ${error}` : ' '}
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        disabled={loading}
      >
        Sign up
      </Button>
    </form>
  );

}

export default SignUpForm;
