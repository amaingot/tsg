import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Snack from '@material-ui/core/SnackbarContent';
import withStyles from '@material-ui/core/styles/withStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Close from '@material-ui/icons/Close';

import SnackbarContentStyle from 'styles/SnackbarContentStyle';
import { Color } from 'styles/Theme';

interface SnackbarContentProps {
  classes: Record<string, string>;
  message: React.ReactNode;
  color?: Color;
  close?: boolean;
  icon?: React.ComponentType<SvgIconProps>;
}

interface SnackbarContentState {
  alert: React.ReactNode;
}

class SnackbarContent extends React.Component<SnackbarContentProps, SnackbarContentState> {
  constructor(props: SnackbarContentProps) {
    super(props);
    this.closeAlert = this.closeAlert.bind(this);
    const { classes, message, color, close } = props;
    let action: React.ReactNode[] = [];
    if (close !== undefined) {
      action = [
        <IconButton
          className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.closeAlert}
        >
          <Close className={classes.close} />
        </IconButton>,
      ];
    }
    this.state = {
      alert: (
        <Snack
          message={
            <div>
              {props.icon !== undefined ? <props.icon className={classes.icon} /> : null}
              {message}
              {close !== undefined ? action : null}
            </div>
          }
          classes={{
            root: classes.root + ' ' + classes[color || 'primary'],
            message: classes.message + ' ' + classes.container,
          }}
        />
      ),
    };
  }

  public closeAlert() {
    this.setState({ alert: null });
  }

  public render() {
    return this.state.alert;
  }
}

export default withStyles(SnackbarContentStyle)(SnackbarContent);
