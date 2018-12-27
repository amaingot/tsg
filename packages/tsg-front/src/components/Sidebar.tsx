import cx from 'classnames';
import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';

// @material-ui/core components
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import HeaderLinks from 'components/HeaderLinks';
import SidebarWrapper from 'components/SidebarWrapper';

import sidebarStyle from 'styles/jss/components/sidebarStyle';

import { RouteType } from 'routes/index';
import avatar from 'static/material-images/faces/avatar.jpg';
import { ApplicationState } from 'store/index';
import { CommonProps } from 'utils/commonProps';
import CustomLink from 'utils/CustomLink';

interface SidebarProps extends CommonProps {
  bgColor?: string; // 'white' | 'black' | 'blue';
  color?: 'white' | 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'rose';
  logo?: string;
  logoText?: string;
  image?: string;
  routes?: RouteType[];
  miniActive: boolean;
  location: Location;
  handleDrawerToggle: (e: React.SyntheticEvent) => void;
  open: boolean;
}

interface SidebarState {
  openAvatar: boolean;
  openComponents: boolean;
  openForms: boolean;
  openTables: boolean;
  openMaps: boolean;
  openPages: boolean;
  miniActive: boolean;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      openAvatar: false,
      openComponents: this.activeRoute('/components'),
      openForms: this.activeRoute('/forms'),
      openTables: this.activeRoute('/tables'),
      openMaps: this.activeRoute('/maps'),
      openPages: this.activeRoute('-page'),
      miniActive: true,
    };
    this.activeRoute.bind(this);
  }
  public static defaultProps = {
    bgColor: 'blue',
  };

  // verifies if routeName is the one active (in browser input)
  public activeRoute = (routeName: string) => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  public openCollapse = (collapse: string) => {
    const st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  };

  public renderBrand() {
    const { classes, bgColor, logo, logoText } = this.props;

    const logoNormal =
      classes.logoNormal +
      ' ' +
      cx({
        [classes.logoNormalSidebarMini]: this.props.miniActive && this.state.miniActive,
      });
    const logoClasses =
      classes.logo +
      ' ' +
      cx({
        [classes.whiteAfter]: bgColor === 'white',
      });

    return (
      <div className={logoClasses}>
        <a href="https://www.creative-tim.com" className={classes.logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="https://www.creative-tim.com" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
  }

  public renderLinks() {
    const { routes, classes, color } = this.props;

    return (
      <List className={classes.list}>
        {routes &&
          routes.map((route, index) => {
            if (route.redirect) {
              return null;
            }
            if (route.collapse) {
              const navLinkClassesCollapse =
                classes.itemLink +
                ' ' +
                cx({
                  [' ' + classes.collapseActive]: this.activeRoute(route.path),
                });
              const itemTextCollapse =
                classes.itemText +
                ' ' +
                cx({
                  [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
                });
              const collapseItemText =
                classes.collapseItemText +
                ' ' +
                cx({
                  [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
                });

              return (
                <ListItem key={index} className={classes.item}>
                  <CustomLink
                    to={'#'}
                    className={navLinkClassesCollapse}
                    onClick={() => this.openCollapse(route.state || '')}
                  >
                    <ListItemIcon className={classes.itemIcon}>
                      {typeof route.icon === 'string' ? (
                        <Icon>{route.icon}</Icon>
                      ) : route.icon ? (
                        <route.icon />
                      ) : (
                        <var />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={route.name}
                      secondary={
                        <b
                          className={
                            classes.caret +
                            ' ' +
                            (this.state[route.state || ''] ? classes.caretActive : '')
                          }
                        />
                      }
                      disableTypography={true}
                      className={itemTextCollapse}
                    />
                  </CustomLink>
                  <Collapse in={this.state[route.state || '']} unmountOnExit>
                    <List className={classes.list + ' ' + classes.collapseList}>
                      {route.views &&
                        route.views.map((view, viewIndex) => {
                          if (view.redirect) {
                            return null;
                          }
                          const collapseItemLink =
                            classes.collapseItemLink +
                            ' ' +
                            cx({
                              [' ' + classes[color || 'white']]: this.activeRoute(view.path),
                            });
                          return (
                            <ListItem key={viewIndex} className={classes.collapseItem}>
                              <CustomLink to={view.path} className={collapseItemLink}>
                                <span className={classes.collapseItemMini}>{view.mini}</span>
                                <ListItemText
                                  primary={view.name}
                                  disableTypography={true}
                                  className={collapseItemText}
                                />
                              </CustomLink>
                            </ListItem>
                          );
                        })}
                    </List>
                  </Collapse>
                </ListItem>
              );
            }
            const navLinkClasses =
              classes.itemLink +
              ' ' +
              cx({
                [' ' + classes[color || 'white']]: this.activeRoute(route.path),
              });
            const itemText =
              classes.itemText +
              ' ' +
              cx({
                [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
              });

            return (
              <ListItem key={index} className={classes.item}>
                <CustomLink to={route.path} className={navLinkClasses}>
                  {route.icon && (
                    <ListItemIcon className={classes.itemIcon}>
                      {typeof route.icon === 'string' ? <Icon>{route.icon}</Icon> : <route.icon />}
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={route.name}
                    disableTypography={true}
                    className={itemText}
                  />
                </CustomLink>
              </ListItem>
            );
          })}
      </List>
    );
  }

  public renderUser() {
    const { classes, bgColor } = this.props;

    const itemText =
      classes.itemText +
      ' ' +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
      });

    const collapseItemText =
      classes.collapseItemText +
      ' ' +
      cx({
        [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
      });

    const userWrapperClass =
      classes.user +
      ' ' +
      cx({
        [classes.whiteAfter]: bgColor === 'white',
      });

    return (
      <div className={userWrapperClass}>
        <div className={classes.photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + ' ' + classes.userItem}>
            <CustomLink
              to={'#'}
              className={classes.itemLink + ' ' + classes.userCollapseButton}
              onClick={() => this.openCollapse('openAvatar')}
            >
              <ListItemText
                primary="Tania Andrew"
                secondary={
                  <b
                    className={
                      classes.caret +
                      ' ' +
                      classes.userCaret +
                      ' ' +
                      (this.state.openAvatar ? classes.caretActive : '')
                    }
                  />
                }
                disableTypography={true}
                className={itemText + ' ' + classes.userItemText}
              />
            </CustomLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + ' ' + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <CustomLink to="#" className={classes.itemLink + ' ' + classes.userCollapseLinks}>
                    <span className={classes.collapseItemMini}>MP</span>
                    <ListItemText
                      primary="My Profile"
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </CustomLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <CustomLink to="#" className={classes.itemLink + ' ' + classes.userCollapseLinks}>
                    <span className={classes.collapseItemMini}>EP</span>
                    <ListItemText
                      primary="Edit Profile"
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </CustomLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <CustomLink to="#" className={classes.itemLink + ' ' + classes.userCollapseLinks}>
                    <span className={classes.collapseItemMini}>S</span>
                    <ListItemText
                      primary="Settings"
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </CustomLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );
  }

  public render() {
    const { classes, image, bgColor, open, handleDrawerToggle } = this.props;

    const drawerPaper =
      classes.drawerPaper +
      ' ' +
      cx({
        [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      ' ' +
      cx({
        [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
      });

    return (
      <div ref="mainPanel">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            classes={{
              paper: drawerPaper + ' ' + classes[bgColor + 'Background'],
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.renderBrand()}
            <SidebarWrapper
              className={sidebarWrapper}
              user={this.renderUser()}
              headerLinks={<HeaderLinks />}
              links={this.renderLinks()}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: 'url(' + image + ')' }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + ' ' + classes[bgColor + 'Background'],
            }}
          >
            {this.renderBrand()}
            <SidebarWrapper
              className={sidebarWrapper}
              user={this.renderUser()}
              links={this.renderLinks()}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: 'url(' + image + ')' }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

const mapState2Props = (state: ApplicationState) => {
  return {
    location: state.router.location,
  };
};

export default connect(mapState2Props)(withStyles(sidebarStyle)(Sidebar));
