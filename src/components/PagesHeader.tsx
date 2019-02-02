import cx from 'classnames';
import * as React from 'react';

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
import Home from '@material-ui/icons/Home';
import Menu from '@material-ui/icons/Menu';

// core components
import Button from 'src/components/Button';

import pageRoutes from 'src/routes/pages';
import pagesHeaderStyle from 'src/styles/jss/components/pagesHeaderStyle';
import { CommonProps } from 'src/utils/commonProps';
import CustomLink from 'src/utils/CustomLink';

interface Props extends CommonProps {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
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
  public activeRoute = (routeName: string) => {
    return false;
    // TODO: Fix this for routes
    // return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  public componentDidUpdate(prevProps: Props) {
    // TODO: Fix some shit here
    // if (prevProps.location.pathname !== this.props.location.pathname) {
    //   this.setState({ open: false });
    // }
  }

  public renderList() {
    const { classes } = this.props;

    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <CustomLink to={'/'} className={classes.navLink}>
            <ListItemIcon className={classes.listItemIcon}>
              <Home />
            </ListItemIcon>
            <ListItemText
              primary={'Dashboard'}
              disableTypography={true}
              className={classes.listItemText}
            />
          </CustomLink>
        </ListItem>
        {pageRoutes.map((route, routeIndex) => {
          if (route.redirect) {
            return null;
          }
          const navLink =
            classes.navLink +
            cx({
              [' ' + classes.navLinkActive]: this.activeRoute(route.path),
            });
          return (
            <ListItem key={routeIndex} className={classes.listItem}>
              <CustomLink to={route.path} className={navLink}>
                {route.icon && (
                  <ListItemIcon className={classes.listItemIcon}>
                    <route.icon />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={route.short}
                  disableTypography={true}
                  className={classes.listItemText}
                />
              </CustomLink>
            </ListItem>
          );
        })}
      </List>
    );
  }

  public render() {
    const { classes, color } = this.props;
    const appBarClasses = cx({
      [' ' + classes[color || 'primary']]: color,
    });

    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} myColor="transparent">
                Tennis Shop Guru
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} myColor="transparent">
                TennisShop Guru
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{this.renderList()}</Hidden>
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
                {this.renderList()}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(pagesHeaderStyle)(PagesHeader);
