import cx from 'classnames';
import React from 'react';

// @material-ui/core components
import IconButton from '@material-ui/core/IconButton';
import Snack from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Close from '@material-ui/icons/Close';

import snackbarContentStyle from 'styles/jss/components/snackbarContentStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  message: React.ReactNode;
  color?: 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'rose';
  close?: boolean;
  icon: React.SFC<any>;
  place?: 'tl' | 'tr' | 'tc' | 'br' | 'bl' | 'bc';
  open?: boolean;
  closeNotification: () => void;
}

const Snackbar: React.SFC<Props> = ({ ...props }) => {
  const { classes, message, color, close, icon, place, open } = props;
  let action: any[] = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>,
    ];
  }
  const iconClasses = cx({
    [classes.icon]: classes.icon,
    [classes.infoIcon]: color === 'info',
    [classes.successIcon]: color === 'success',
    [classes.warningIcon]: color === 'warning',
    [classes.dangerIcon]: color === 'danger',
    [classes.primaryIcon]: color === 'primary',
    [classes.roseIcon]: color === 'rose',
  });
  return (
    <Snack
      classes={{
        anchorOriginTopCenter: classes.top20,
        anchorOriginTopRight: classes.top40,
        anchorOriginTopLeft: classes.top40,
      }}
      anchorOrigin={{
        vertical: place && place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place && place.indexOf('l') !== -1
            ? 'left'
            : place && place.indexOf('c') !== -1
            ? 'center'
            : 'right',
      }}
      open={!!open}
      message={
        <div>
          {icon ? <props.icon className={iconClasses} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + ' ' + classes[color || 'info'],
          message: classes.message,
        },
      }}
    />
  );
};

Snackbar.defaultProps = {
  color: 'info',
};

export default withStyles(snackbarContentStyle)(Snackbar);
