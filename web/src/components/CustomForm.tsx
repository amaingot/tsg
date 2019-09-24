import * as React from 'react';

import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import FormField, { FormFieldProps } from 'src/components/FormField';
import { CustomerFieldKey, customerFormFields } from 'src/utils/customerFormHelpers';
import { employeeFormFields, EmployeeFormKey } from 'src/utils/employeeFormHelpers';
import { FormFieldArray, FormRecord, FormValueMap } from 'src/utils/formHelpers';
import { JobFieldKey, jobFormFields } from 'src/utils/jobFormHelpers';

const styles: StyleRulesCallback<'form'> = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
});

export interface GenericFormProps<Key extends string> {
  loading: boolean;
  error?: string;
  values: FormValueMap<Key>;
  errors: FormValueMap<Key>;
  handleChange: (key: Key) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UnstyledCustomForm = <Key extends string>(
  fields: FormFieldArray<Key>
): React.SFC<GenericFormProps<Key> & WithStyles<typeof styles>> => props => {
  const { error, values, handleChange, errors, loading, classes } = props;
  const renderFormField = (f: FormRecord<Key>, i: number) => {
    const formProps: FormFieldProps = {
      id: f.key,
      label: f.label,
      type: f.type,
      value: values[f.key],
      onChange: handleChange(f.key),
      error: errors[f.key],
      disabled: loading,
      autoFocus: i === 0,
      required: f.required,
    };
    return <FormField key={f.key} {...formProps} />;
  };

  return (
    <form className={classes.form}>
      {fields.map(renderFormField)}
      <Typography color="error" variant="body1" component="p">
        {error ? `Error: ${error}` : ' '}
      </Typography>
    </form>
  );
};

const StyledCustomForm = <K extends string>(fields: FormFieldArray<K>) =>
  withStyles(styles)(UnstyledCustomForm<K>(fields));

export const CustomerForm = StyledCustomForm<CustomerFieldKey>(customerFormFields);
export const JobForm = StyledCustomForm<JobFieldKey>(jobFormFields);
export const EmployeeForm = StyledCustomForm<EmployeeFormKey>(employeeFormFields);
