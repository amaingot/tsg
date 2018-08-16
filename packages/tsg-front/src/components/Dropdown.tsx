// nodejs library that concatenates classes
import classNames from 'classnames';
import React from 'react';
import { Manager, Popper, Target } from 'react-popper';

// @material-ui/core components
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

// core components
import Button, { ButtonProps } from 'components/Button';
import { Color } from 'styles/Theme';

import customDropdownStyle from 'styles/DropdownStyle';

interface DropdownProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  hoverColor?: Color | 'black';
  buttonText?: React.ReactNode;
  buttonIcon?: React.ComponentType<SvgIconProps>;
  dropdownList?: any[];
  buttonProps?: ButtonProps;
  dropup?: boolean;
  dropdownHeader?: React.ReactNode;
  rtlActive?: boolean;
  caret?: boolean;
  left?: boolean;
  noLiPadding?: boolean;
}

interface DropdownState {
  open: boolean;
}

class CustomDropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  public handleClick() {
    this.setState({ open: true });
  }

  public handleClose() {
    this.setState({ open: false });
  }

  public render() {
    const { open } = this.state;
    const {
      classes,
      buttonText,
      dropdownList,
      buttonProps,
      dropup,
      dropdownHeader,
      caret,
      hoverColor,
      left,
      rtlActive,
      noLiPadding,
    } = this.props;

    const caretClasses = classNames({
      [classes.caret]: true,
      [classes.caretActive]: open,
      [classes.caretRTL]: rtlActive,
    });

    const dropdownItem = classNames({
      [classes.dropdownItem]: true,
      [classes[hoverColor + 'Hover']]: true,
      [classes.noLiPadding]: noLiPadding,
      [classes.dropdownItemRTL]: rtlActive,
    });

    return (
      <Manager>
        <Target>
          <Button
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : undefined}
            aria-haspopup="true"
            {...buttonProps}
            onClick={this.handleClick}
          >
            {this.props.buttonIcon !== undefined ? (
              <this.props.buttonIcon className={classes.buttonIcon} />
            ) : null}
            {buttonText !== undefined ? buttonText : null}
            {caret ? <b className={caretClasses} /> : null}
          </Button>
        </Target>
        <Popper
          placement={
            dropup ? (left ? 'top-end' : 'top-start') : left ? 'bottom-end' : 'bottom-start'
          }
          eventsEnabled={open}
          className={classNames({
            [classes.popperClose]: !open,
            [classes.pooperResponsive]: true,
          })}
        >
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grow
              in={open}
              style={dropup ? { transformOrigin: '0 100% 0' } : { transformOrigin: '0 0 0' }}
            >
              <Paper className={classes.dropdown}>
                <MenuList role="menu" className={classes.menuList}>
                  {dropdownHeader !== undefined ? (
                    <MenuItem onClick={this.handleClose} className={classes.dropdownHeader}>
                      {dropdownHeader}
                    </MenuItem>
                  ) : null}
                  {(dropdownList || []).map((prop, key) => {
                    if (prop.divider) {
                      return (
                        <Divider
                          key={key}
                          onClick={this.handleClose}
                          className={classes.dropdownDividerItem}
                        />
                      );
                    }
                    return (
                      <MenuItem key={key} onClick={this.handleClose} className={dropdownItem}>
                        {prop}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    );
  }
}

export default withStyles(customDropdownStyle)(CustomDropdown);
