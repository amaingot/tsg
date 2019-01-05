import classNames from 'classnames';
import React from 'react';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Notifications from '@material-ui/icons/Notifications';
import Person from '@material-ui/icons/Person';
import Search from '@material-ui/icons/Search';

// core components
import Button from 'components/Button';
import CustomInput from 'components/CustomInput';

import headerLinksStyle from 'styles/jss/components/headerLinksStyle';
import { CommonProps } from 'utils/commonProps';

interface State {
  open: boolean;
}

class HeaderLinks extends React.Component<CommonProps, State> {
  public state = {
    open: false,
  };

  public anchorEl: HTMLElement = new HTMLElement();

  public handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const { classes } = this.props;
    const { open } = this.state;
    const searchButton = classes.top + ' ' + classes.searchButton;
    const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);
    const wrapper = classNames({});
    const managerClasses = classNames({
      [classes.managerClasses]: true,
    });

    return (
      <div className={wrapper}>
        <CustomInput
          formControlProps={{
            className: classes.top + ' ' + classes.search,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
              className: classes.searchInput,
            },
          }}
        />
        <Button myColor="white" aria-label="edit" justIcon round className={searchButton}>
          <Search className={classes.headerLinksSvg + ' ' + classes.searchIcon} />
        </Button>
        <Button
          myColor="transparent"
          simple
          aria-label="Dashboard"
          justIcon
          className={classes.buttonLink}
        >
          <Dashboard className={classes.headerLinksSvg + ' ' + classes.links} />
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>Dashboard</span>
          </Hidden>
        </Button>
        <div className={managerClasses}>
          <Button
            myColor="transparent"
            justIcon
            aria-label="Notifications"
            aria-owns={open ? 'menu-list' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.buttonLink}
            buttonRef={node => {
              this.anchorEl = node;
            }}
          >
            <Notifications className={classes.headerLinksSvg + ' ' + classes.links} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <span onClick={this.handleClick} className={classes.linkText}>
                Notification
              </span>
            </Hidden>
          </Button>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !open,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true,
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                // id="menu-list"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem onClick={this.handleClose} className={dropdownItem}>
                        Mike John responded to your email
                      </MenuItem>
                      <MenuItem onClick={this.handleClose} className={dropdownItem}>
                        You have 5 new tasks
                      </MenuItem>
                      <MenuItem onClick={this.handleClose} className={dropdownItem}>
                        You're now friend with Andrew
                      </MenuItem>
                      <MenuItem onClick={this.handleClose} className={dropdownItem}>
                        Another Notification
                      </MenuItem>
                      <MenuItem onClick={this.handleClose} className={dropdownItem}>
                        Another One
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Button myColor="transparent" aria-label="Person" justIcon className={classes.buttonLink}>
          <Person className={classes.headerLinksSvg + ' ' + classes.links} />
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>Profile</span>
          </Hidden>
        </Button>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
