import classNames from 'classnames';
import React from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import withStyles from '@material-ui/core/styles/withStyles';

import Button, { ButtonProps } from 'components/Button';

import customDropdownStyle from 'styles/jss/components/customDropdownStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  hoverColor?: string; // 'dark' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'rose';
  buttonText?: React.ReactNode;
  buttonIcon?: React.ComponentType<any>;
  dropdownList?: any[];
  buttonProps?: ButtonProps;
  dropup?: boolean;
  dropdownHeader?: React.ReactNode;
  caret?: boolean;
  dropPlacement?:
    | 'bottom'
    | 'top'
    | 'right'
    | 'left'
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
  noLiPadding?: boolean;
  innerDropDown?: boolean;
  navDropdown?: boolean;
  onClick?: React.MouseEventHandler;
}

interface State {
  open: boolean;
}

class CustomDropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public anchorEl: HTMLElement = new HTMLElement();

  public static defaultProps = {
    caret: true,
    dropup: false,
    hoverColor: 'primary',
  };

  public handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  public handleClose = (event: React.ChangeEvent<{}>) => {
    // if (this.anchorEl.contains(event.target)) {
    //   return;
    // }

    this.setState({ open: false });
  };

  public handleCloseMenu = (param: React.MouseEvent) => {
    this.setState({ open: false });
    if (this.props && this.props.onClick) {
      this.props.onClick(param);
    }
  };

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
      dropPlacement,
      noLiPadding,
      innerDropDown,
      navDropdown,
    } = this.props;

    const caretClasses = classNames({
      [classes.caret]: true,
      [classes.caretDropup]: dropup && !open,
      [classes.caretActive]: open && !dropup,
    });

    const dropdownItem = classNames({
      [classes.dropdownItem]: true,
      [classes[hoverColor + 'Hover']]: true,
      [classes.noLiPadding]: noLiPadding,
    });

    const dropDownMenu = (
      <MenuList role="menu" className={classes.menuList}>
        {dropdownHeader ? (
          <MenuItem onClick={this.handleCloseMenu} className={classes.dropdownHeader}>
            {dropdownHeader}
          </MenuItem>
        ) : null}
        {dropdownList &&
          dropdownList.map((prop, key) => {
            if (prop.divider) {
              return (
                <Divider
                  key={key}
                  onClick={this.handleCloseMenu}
                  className={classes.dropdownDividerItem}
                />
              );
            } else if (prop.ref === 'multi') {
              return (
                <MenuItem
                  key={key}
                  className={dropdownItem}
                  style={{ overflow: 'visible', padding: 0 }}
                >
                  {prop}
                </MenuItem>
              );
            }
            return (
              <MenuItem
                key={key}
                onClick={() => this.handleCloseMenu(prop)}
                className={dropdownItem}
              >
                {prop}
              </MenuItem>
            );
          })}
      </MenuList>
    );

    return (
      <div className={innerDropDown ? classes.innerManager : classes.manager}>
        <div className={buttonText ? '' : classes.target}>
          <Button
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : undefined}
            aria-haspopup="true"
            buttonRef={node => {
              this.anchorEl = node;
            }}
            {...buttonProps}
            onClick={this.handleClick}
          >
            {this.props.buttonIcon ? (
              <this.props.buttonIcon className={classes.buttonIcon} />
            ) : null}
            {buttonText ? buttonText : null}
            {caret ? <b className={caretClasses} /> : null}
          </Button>
        </div>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          placement={dropPlacement}
          className={classNames({
            [classes.popperClose]: !open,
            [classes.pooperResponsive]: true,
            [classes.pooperNav]: open && navDropdown,
          })}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              in={open}
              // id="menu-list"
              style={dropup ? { transformOrigin: '0 100% 0' } : { transformOrigin: '0 0 0' }}
            >
              <Paper className={classes.dropdown}>
                {innerDropDown ? (
                  dropDownMenu
                ) : (
                  <ClickAwayListener onClickAway={this.handleClose}>
                    {dropDownMenu}
                  </ClickAwayListener>
                )}
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default withStyles(customDropdownStyle)(CustomDropdown);
