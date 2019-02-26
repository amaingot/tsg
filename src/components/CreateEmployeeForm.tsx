import * as React from 'react';

import Button from '@material-ui/core/Button';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import FormField, { FormFieldProps } from 'src/components/FormField';
import { CreateEmployeeInput } from 'src/graphql/types';
import {
  employeeFormFields,
  EmployeeFormKey,
  validateEmployeeFormFields,
} from 'src/utils/employeeFormHelpers';
import { FormRecord, FormState, FormValueMap } from 'src/utils/formHelpers';

const styles: StyleRulesCallback = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    float: 'right',
  },
});

export interface Props {
  loading: boolean;
  submit: (f: CreateEmployeeInput) => void;
  error?: string;
}

interface State extends FormState<EmployeeFormKey> {
  attempted: boolean;
}

class CreateEmployeeForm extends React.Component<Props & WithStyles, State> {
  constructor(props: Props & WithStyles) {
    super(props);

    this.state = {
      attempted: false,
      errors: {},
      values: {},
    };
  }
  public handle = (key: EmployeeFormKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (this.validate(true) && this.state.values.email) {
      submit({ ...this.state.values, owner: this.state.values.email });
    }
  };

  public validate = (all?: boolean) => {
    const { values } = this.state;

    const errors: FormValueMap<EmployeeFormKey> = validateEmployeeFormFields(values);

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  public renderFormField = (f: FormRecord<EmployeeFormKey>, i: number) => {
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
    const { classes, error } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        {employeeFormFields.map(this.renderFormField)}
        <Typography color="error" variant="body1" component="p">
          {error ? `Error: ${error}` : ' '}
        </Typography>
        <Button type="submit" variant="contained" className={classes.submit}>
          Create Employee
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(CreateEmployeeForm);
