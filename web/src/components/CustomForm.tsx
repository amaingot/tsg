import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import FormField, { FormFieldProps } from '../components/FormField';
import { CustomerFieldKey, customerFormFields } from '../utils/customerFormHelpers';
import { employeeFormFields, EmployeeFormKey } from '../utils/employeeFormHelpers';
import { FormFieldArray, FormRecord, FormValueMap } from '../utils/formHelpers';
import { JobFieldKey, jobFormFields } from '../utils/jobFormHelpers';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export interface GenericFormProps<Key extends string> {
  loading: boolean;
  error?: string;
  values: FormValueMap<Key>;
  errors: FormValueMap<Key>;
  handleChange: (key: Key) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomForm = <Key extends string>(fields: FormFieldArray<Key>): React.FC<GenericFormProps<Key>> => props => {
  const { error, values, handleChange, errors, loading } = props;
  const classes = useStyles();

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

export const CustomerForm = CustomForm<CustomerFieldKey>(customerFormFields);
export const JobForm = CustomForm<JobFieldKey>(jobFormFields);
export const EmployeeForm = CustomForm<EmployeeFormKey>(employeeFormFields);
