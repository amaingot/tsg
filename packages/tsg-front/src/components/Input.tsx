import classNames from 'classnames';
import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import MuiInput from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import Check from '@material-ui/icons/Check';

import Clear from '@material-ui/icons/Clear';

import { WithTheme } from '@material-ui/core';
import InputStyle from 'styles/InputStyle';

interface InputProps {
  classes: Record<string, string>;
  labelText?: React.ReactNode;
  labelProps?: object;
  id?: string;
  inputProps?: object;
  formControlProps?: object;
  inputRootCustomClasses?: string;
  error?: boolean;
  success?: boolean;
  white?: boolean;
}

const Input: React.SFC<InputProps & Partial<WithTheme>> = props => {
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
    [classes.marginTop]: labelText === undefined,
    [inputRootCustomClasses || '']: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  const formControlClasses = classNames({
    [classes.formControl]: true,
    [classes.formControlLabel]: labelText !== undefined,
    // TODO: Fix this odd next lined
    // [formControlProps.className]: formControlProps.className !== undefined,
  });
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel className={classes.labelRoot + ' ' + labelClasses} htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      ) : null}
      <MuiInput
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={classes.feedback + ' ' + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
};

export default withStyles(InputStyle)(Input);
