import cx from 'classnames';
import React from 'react';

// @material-ui/core components
import IconButton from '@material-ui/core/IconButton';
import Snack from '@material-ui/core/SnackbarContent';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Close from '@material-ui/icons/Close';

import snackbarContentStyle from 'styles/jss/components/snackbarContentStyle';

function SnackbarContent({ ...props }) {
  const { classes, message, color, close, icon } = props;
  let action = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton className={classes.iconButton} key="close" aria-label="Close" color="inherit">
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
      message={
        <div>
          {icon !== undefined ? <props.icon className={iconClasses} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: classes.root + ' ' + classes[color],
        message: classes.message,
      }}
      action={action}
    />
  );
}

SnackbarContent.defaultProps = {
  color: 'info',
};

SnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary', 'rose']),
  close: PropTypes.bool,
  icon: PropTypes.func,
};

export default withStyles(snackbarContentStyle)(SnackbarContent);
