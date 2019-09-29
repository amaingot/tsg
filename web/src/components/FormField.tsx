import * as React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export interface FormFieldProps {
  id: string;
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  disabled: boolean;
  autoFocus?: boolean;
  type?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = props => {
  const { id, label, disabled, error, onChange, type, autoFocus, value, required } = props;
  return (
    <FormControl
      id={id}
      margin="normal"
      required={required}
      fullWidth
      error={!!error}
      disabled={disabled}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        name={id}
        autoComplete={id}
        autoFocus={autoFocus}
        type={type}
        onChange={onChange}
        value={value}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default FormField;
