import * as React from 'react';

import Button from '@material-ui/core/Button';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

import FormField from 'src/components/FormField';
import HeaderIcon from 'src/components/HeaderIcon';
import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import SimpleLayout from 'src/layouts/SimpleLayout';

const styles: StyleRulesCallback = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

type Props = WithStyles & WithAuthProps;

type KeyType = 'firstName' | 'lastName' | 'email' | 'phone' | 'password' | 'passwordAgain';
type FormValues = Record<KeyType, string>;
type ErrorMessages = Partial<FormValues>;

interface FormFieldShape {
  label: string;
  key: KeyType;
  type?: string;
}

const formFields: FormFieldShape[] = [
  {
    label: 'First Name',
    key: 'firstName',
  },
  {
    label: 'Last Name',
    key: 'lastName',
  },
  {
    label: 'Phone Number',
    key: 'phone',
  },
  {
    label: 'Email Address',
    type: 'email',
    key: 'email',
  },
  {
    label: 'Password',
    key: 'password',
    type: 'password',
  },
  {
    label: 'Confirm Password',
    key: 'passwordAgain',
    type: 'password',
  },
];

interface State {
  agree: boolean;
  values: FormValues;
  errors: ErrorMessages;
  attempted: boolean;
}

class SignUpPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      values: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        passwordAgain: '',
      },
      agree: false,
      attempted: false,
      errors: {},
    };
  }

  public handle = (key: KeyType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = this.state.values;
    newValues[key] = e.currentTarget.value;
    this.setState(
      {
        values: newValues,
      },
      () => this.validate()
    );
  };

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { signUp } = this.props.auth;

    if (this.validate(true)) {
      signUp({ ...this.state.values });
    }
  };

  public validate = (all?: boolean) => {
    const { values } = this.state;

    const errors: ErrorMessages = {};

    if (
      all &&
      values.email &&
      values.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ===
        null
    ) {
      errors.email = 'Please enter a valid email address.';
    }

    if (all && values.password && values.password.length < 8) {
      errors.password = 'Your password must be longer than eight characters.';
    }

    if (
      all &&
      values.password &&
      values.passwordAgain &&
      values.password !== values.passwordAgain
    ) {
      errors.passwordAgain = 'You must enter the exact same password twice.';
    }

    if (all && !values.firstName) {
      errors.firstName = 'You must enter your first name.';
    }

    if (all && !values.lastName) {
      errors.lastName = 'You must enter your last name.';
    }

    if (all && !values.phone && values.phone.match(/^\+?[1-9]\d{10,14}$/) === null) {
      errors.phone = 'You must enter your phone number. Example: +15557770000';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  public renderForm(loading: boolean) {
    const { classes, auth } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        {formFields.map((f, i) => (
          <FormField
            key={f.key}
            id={f.key}
            label={f.label}
            type={f.type}
            value={this.state.values[f.key]}
            onChange={this.handle(f.key)}
            error={this.state.errors[f.key]}
            disabled={loading}
            autoFocus={i === 0}
          />
        ))}
        <Typography color="error" variant="body1" component="p">
          {auth.error ? `Error: ${auth.errorMessage}` : ' '}
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

  public render() {
    const { auth } = this.props;
    const loading = !!auth.loading;

    return (
      <SimpleLayout>
        <HeaderIcon loading={loading} icon={PersonIcon} />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {this.renderForm(loading)}
      </SimpleLayout>
    );
  }
}

const StyledSignInPage = withStyles(styles)(SignUpPage);

export default withAuth(StyledSignInPage);
