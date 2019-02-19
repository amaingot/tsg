import * as React from 'react';

import Button from '@material-ui/core/Button';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import FormField, { FormFieldProps } from 'src/components/FormField';
import { CreateCustomerInput } from 'src/graphql/types';
import { FormErrorMessages, FormFieldArray, FormRecord, FormState } from 'src/utils/formHelpers';

const styles: StyleRulesCallback = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export interface Props {
  loading: boolean;
  submit: (f: CreateCustomerInput) => void;
  error?: string;
}

type FormKey =
  | 'lastName'
  | 'firstName'
  | 'email'
  | 'address'
  | 'address2'
  | 'city'
  | 'state'
  | 'zip'
  | 'homePhone'
  | 'cellPhone'
  | 'workPhone';

const formFields: FormFieldArray<FormKey> = [
  {
    label: 'Last Name',
    key: 'lastName',
    required: true,
  },
  {
    label: 'First Name',
    key: 'firstName',
    required: true,
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Address',
    key: 'address',
  },
  {
    label: 'Address 2',
    key: 'address2',
  },
  {
    label: 'City',
    key: 'city',
  },
  {
    label: 'State',
    key: 'state',
  },
  {
    label: 'Zip',
    key: 'zip',
  },
  {
    label: 'Home Phone',
    key: 'homePhone',
  },
  {
    label: 'Cell Phone',
    key: 'cellPhone',
  },
  {
    label: 'Work Phone',
    key: 'workPhone',
  },
];

interface State extends FormState<FormKey> {
  attempted: boolean;
}

class CreateCustomerForm extends React.Component<Props & WithStyles, State> {
  constructor(props: Props & WithStyles) {
    super(props);

    this.state = {
      attempted: false,
      errors: {},
      values: {},
    };
  }
  public handle = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = this.state.values;
    newValues[key] = e.currentTarget.value.length === 0 ? undefined : e.currentTarget.value;
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

    if (all && !values.firstName) {
      errors.firstName = 'You must enter your first name.';
    }

    if (all && !values.lastName) {
      errors.lastName = 'You must enter your last name.';
    }

    if (all && values.homePhone && values.homePhone.match(/^\+?[1-9]\d{10,14}$/) === null) {
      errors.homePhone = 'You must enter your phone number. Example: +15557770000';
    }

    if (all && values.cellPhone && values.cellPhone.match(/^\+?[1-9]\d{10,14}$/) === null) {
      errors.cellPhone = 'You must enter your phone number. Example: +15557770000';
    }

    if (all && values.workPhone && values.workPhone.match(/^\+?[1-9]\d{10,14}$/) === null) {
      errors.workPhone = 'You must enter your phone number. Example: +15557770000';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
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
      required: f.required,
    };

    return <FormField key={f.key} {...formProps} />;
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
          Create Customer
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(CreateCustomerForm);
