import cx from 'classnames';
import { RouterState } from 'connected-react-router';
import React from 'react';
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Menu from '@material-ui/icons/Menu';

// core components
import Button from 'components/Button';

import { connect } from 'react-redux';
import { ApplicationState } from 'store/index';
import pagesHeaderStyle from 'styles/jss/components/pagesHeaderStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  router: RouterState;
}

interface State {
  open: boolean;
}

class PagesHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  // verifies if routeName is the one active (in browser input)
  // public activeRoute(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  // }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.router.location.pathname !== this.props.router.location.pathname) {
      this.setState({ open: false });
    }
  }

  public render() {
    const { classes, color } = this.props;
    const appBarClasses = cx({
      [' ' + classes[color || 'primary']]: color,
    });
    const list = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={'/dashboard'} className={classes.navLink}>
            <ListItemIcon className={classes.listItemIcon}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText
              primary={'Dashboard'}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        {/* {pagesRoutes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          }
          const navLink =
            classes.navLink +
            cx({
              [' ' + classes.navLinkActive]: this.activeRoute(prop.path),
            });
          return (
            <ListItem key={key} className={classes.listItem}>
              <NavLink to={prop.path} className={navLink}>
                <ListItemIcon className={classes.listItemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.short}
                  disableTypography={true}
                  className={classes.listItemText}
                />
              </NavLink>
            </ListItem>
          );
        })} */}
      </List>
    );
    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} myColor="transparent">
                Material Dashboard Pro React
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} myColor="transparent">
                MD Pro React
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              myColor="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={'right'}
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper,
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapState2Props = (state: ApplicationState) => {
  return { router: state.router };
};

export default withStyles(pagesHeaderStyle)(connect(mapState2Props)(PagesHeader));
