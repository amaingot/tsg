import classNames from 'classnames';
import React from 'react';

import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input, { InputProps } from '@material-ui/core/Input';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';

import withStyles from '@material-ui/core/styles/withStyles';

import customInputStyle from 'styles/jss/components/customInputStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  labelText?: React.ReactNode;
  labelProps?: InputLabelProps;
  id?: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  inputRootCustomClasses?: string;
  error?: boolean;
  success?: boolean;
  white?: boolean;
  helpText?: React.ReactNode;
}

const CustomInput: React.SFC<Props> = ({ ...props }) => {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helpText,
  } = props;

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: success && !error,
  });

  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });

  const marginTop = classNames({
    [inputRootCustomClasses || '']: inputRootCustomClasses !== undefined,
  });

  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });

  const formControlClasses = formControlProps
    ? classNames(formControlProps.className, classes.formControl)
    : classes.formControl;

  const helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  });

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel className={classes.labelRoot + ' ' + labelClasses} htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {helpText !== undefined ? (
        <FormHelperText id={id + '-text'} className={helpTextClasses}>
          {helpText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default withStyles(customInputStyle)(CustomInput);
