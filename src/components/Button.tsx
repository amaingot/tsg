import classNames from 'classnames';
import * as React from 'react';

// material-ui components
import Button, { ButtonClassKey, ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import withStyles, { ClassNameMap, WithStyles } from '@material-ui/core/styles/withStyles';

import buttonStyle from 'src/styles/jss/components/buttonStyle';
import CustomLink from 'src/utils/CustomLink';

export interface ButtonProps extends MuiButtonProps {
  myColor?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'white'
    | 'twitter'
    | 'facebook'
    | 'google'
    | 'linkedin'
    | 'pinterest'
    | 'youtube'
    | 'tumblr'
    | 'github'
    | 'behance'
    | 'dribbble'
    | 'reddit'
    | 'transparent';
  mySize?: 'sm' | 'lg';
  to?: string;
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  muiClasses?: Partial<ClassNameMap<ButtonClassKey>>;
}

function RegularButton(props: ButtonProps & WithStyles) {
  const {
    classes,
    myColor,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    mySize,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    to,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[mySize || 'lg']]: mySize,
    [classes[myColor || 'primary']]: myColor,
    [classes.round]: round,
    [classes.fullWidth || '']: fullWidth,
    [classes.disabled || '']: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className || '']: className,
  });

  const additionalProps: Partial<ButtonProps> = {};

  if (to) {
    additionalProps.component = (linkProps: any) => <CustomLink to={to} {...linkProps} />;
  }

  return (
    <Button {...rest} classes={muiClasses} className={btnClasses} {...additionalProps}>
      {children}
    </Button>
  );
}

export default withStyles(buttonStyle)(RegularButton);
