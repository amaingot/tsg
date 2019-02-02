import cx from 'classnames';
import * as React from 'react';

// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';

// material-ui icons
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ViewList from '@material-ui/icons/ViewList';

// core components
import Button from 'src/components/Button';
import HeaderLinks from './HeaderLinks';

import headerStyle from 'src/styles/jss/components/headerStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  sidebarMinimize: React.MouseEventHandler;
  handleDrawerToggle: React.MouseEventHandler;
  miniActive: boolean;
}

const Header: React.SFC<Props> = ({ ...props }) => {
  const { classes, color } = props;
  const appBarClasses = cx({
    [' ' + classes[color || 'primary']]: color,
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={classes.sidebarMinimize}>
            {props.miniActive ? (
              <Button justIcon round myColor="white" onClick={props.sidebarMinimize}>
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button justIcon round myColor="white" onClick={props.sidebarMinimize}>
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} myColor="transparent">
            Tennis Shop Guru
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            myColor="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(headerStyle)(Header);
