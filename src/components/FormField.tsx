import * as React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  disabled: boolean;
  autoFocus?: boolean;
  type?: string;
}

const FormField: React.FunctionComponent<FormFieldProps> = props => {
  const { id, label, disabled, error, onChange, type, autoFocus, value } = props;
  return (
    <FormControl id={id} margin="normal" required fullWidth error={!!error} disabled={disabled}>
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
