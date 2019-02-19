import * as React from 'react';

import Button from '@material-ui/core/Button';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import FormField, { FormFieldProps } from 'src/components/FormField';
import {
  FormErrorMessages,
  FormFieldArray,
  FormRecord,
  FormState,
  FormValues,
} from 'src/utils/formHelpers';

const styles: StyleRulesCallback = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

type FormKey = 'firstName' | 'lastName' | 'email' | 'phone' | 'password' | 'passwordAgain';

const formFields: FormFieldArray<FormKey> = [
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

interface Props extends WithStyles {
  loading: boolean;
  submit: (f: FormValues<FormKey>) => void;
  error?: string;
}

interface State extends FormState<FormKey> {
  agree: boolean;
  attempted: boolean;
  values: FormValues<FormKey>;
}

class SignUpForm extends React.Component<Props, State> {
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

  public handle = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const { submit } = this.props;

    if (this.validate(true)) {
      submit({ ...this.state.values });
    }
  };

  public renderFormField = (f: FormRecord<FormKey>, i: number) => {
    const { loading } = this.props;

    const formProps: FormFieldProps = {
      id: f.key,
      label: f.label,
      type: f.type,
      value: this.state.values[f.key],
      onChange: this.handle(f.key),
      error: this.state.errors[f.key],
      disabled: loading,
      autoFocus: i === 0,
      required: true,
    };

    return <FormField key={f.key} {...formProps} />;
  };

  public validate = (all?: boolean) => {
    const { values } = this.state;

    const errors: FormErrorMessages<FormKey> = {};

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

  public render() {
    const { classes, loading, error } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        {formFields.map(this.renderFormField)}
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
}

export default withStyles(styles)(SignUpForm);
