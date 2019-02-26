import * as React from 'react';

import Button from '@material-ui/core/Button';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import FormField, { FormFieldProps } from 'src/components/FormField';
import { CreateJobInput } from 'src/graphql/types';
import { FormRecord, FormState } from 'src/utils/formHelpers';
import { JobFieldKey, jobFormFields } from 'src/utils/jobFormHelpers';

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
  submit: (f: CreateJobInput) => void;
  error?: string;
}

interface State extends FormState<JobFieldKey> {
  attempted: boolean;
}

class CreateJobForm extends React.Component<Props & WithStyles, State> {
  constructor(props: Props & WithStyles) {
    super(props);

    this.state = {
      attempted: false,
      errors: {},
      values: {},
    };
  }
  public handle = (key: JobFieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = this.state.values;
    newValues[key] = e.currentTarget.value.length === 0 ? undefined : e.currentTarget.value;
    this.setState({
      values: newValues,
    });
  };

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submit } = this.props;

    submit({ ...this.state.values });
  };

  public renderFormField = (f: FormRecord<JobFieldKey>, i: number) => {
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
        {jobFormFields.map(this.renderFormField)}
        <Typography color="error" variant="body1" component="p">
          {error ? `Error: ${error}` : ' '}
        </Typography>
        <Button type="submit" variant="contained" className={classes.submit}>
          Create Job
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(CreateJobForm);
