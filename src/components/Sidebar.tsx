import cx from 'classnames';
import { Location } from 'history';
import * as React from 'react';

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
import HeaderLinks from 'src/components/HeaderLinks';
import SidebarWrapper from 'src/components/SidebarWrapper';

import sidebarStyle from 'src/styles/jss/components/sidebarStyle';

import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import { RouteType } from 'src/routes/index';
import { CommonProps } from 'src/utils/commonProps';
import CustomLink from 'src/utils/CustomLink';

interface Props extends CommonProps {
  bgColor?: string; // 'white' | 'black' | 'blue';
  color?: 'white' | 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'rose';
  logo?: string;
  image?: string;
  routes?: RouteType[];
  miniActive: boolean;
  location: Location<any>;
  handleDrawerToggle: (e: React.SyntheticEvent) => void;
  open: boolean;
}

interface SidebarState {
  miniActive: boolean;
  openAvatar: boolean;
}

class Sidebar extends React.Component<Props & WithAuthProps, SidebarState> {
  constructor(props: Props & WithAuthProps) {
    super(props);
    this.state = {
      miniActive: true,
      openAvatar: false,
    };
  }
  public static defaultProps = {
    bgColor: 'blue',
  };

  // verifies if routeName is the one active (in browser input)
  public activeRoute = (routeName: string) => {
    return true;
    // TODO: Fix this
    // return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  // public openCollapse = (collapse: string) => {
  //   const st: SidebarState = {};
  //   st.collapse = !this.state.collapse;
  //   this.setState(st);
  // };

  public toggleAvatarCollapse = () => {
    this.setState(state => ({ openAvatar: !state.openAvatar }));
  };

  public renderBrand() {
    const { classes, bgColor, logo } = this.props;

    const logoClasses =
      classes.logo +
      ' ' +
      cx({
        [classes.whiteAfter]: bgColor === 'white',
      });

    return (
      <div className={logoClasses}>
        <CustomLink to="/">
          <img src={logo} alt="logo" className={classes.img} />
        </CustomLink>
      </div>
    );
  }

  public renderCollapseableLink(route: RouteType, index: number) {
    return <div />;

    // TODO: Fix this shit
    // const { classes, color } = this.props;
    // const navLinkClassesCollapse =
    //   classes.itemLink +
    //   ' ' +
    //   cx({
    //     [' ' + classes.collapseActive]: this.activeRoute(route.path),
    //   });
    // const itemTextCollapse =
    //   classes.itemText +
    //   ' ' +
    //   cx({
    //     [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
    //   });
    // const collapseItemText =
    //   classes.collapseItemText +
    //   ' ' +
    //   cx({
    //     [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
    //   });

    // return (
    //   <ListItem key={index} className={classes.item}>
    //     <CustomLink
    //       to={'#'}
    //       className={navLinkClassesCollapse}
    //       onClick={() => this.openCollapse(route.state || '')}
    //     >
    //       <ListItemIcon className={classes.itemIcon}>
    //         {typeof route.icon === 'string' ? (
    //           <Icon>{route.icon}</Icon>
    //         ) : route.icon ? (
    //           <route.icon />
    //         ) : (
    //           <var />
    //         )}
    //       </ListItemIcon>
    //       <ListItemText
    //         primary={route.name}
    //         secondary={
    //           <b
    //             className={
    //               classes.caret + ' ' + (this.state[route.state || ''] ? classes.caretActive : '')
    //             }
    //           />
    //         }
    //         disableTypography={true}
    //         className={itemTextCollapse}
    //       />
    //     </CustomLink>
    //     <Collapse in={this.state[route.state || '']} unmountOnExit>
    //       <List className={classes.list + ' ' + classes.collapseList}>
    //         {route.views &&
    //           route.views.map((view, viewIndex) => {
    //             if (view.redirect) {
    //               return null;
    //             }
    //             const collapseItemLink =
    //               classes.collapseItemLink +
    //               ' ' +
    //               cx({
    //                 [' ' + classes[color || 'white']]: this.activeRoute(view.path),
    //               });
    //             return (
    //               <ListItem key={viewIndex} className={classes.collapseItem}>
    //                 <CustomLink to={view.path} className={collapseItemLink}>
    //                   <span className={classes.collapseItemMini}>{view.mini}</span>
    //                   <ListItemText
    //                     primary={view.name}
    //                     disableTypography={true}
    //                     className={collapseItemText}
    //                   />
    //                 </CustomLink>
    //               </ListItem>
    //             );
    //           })}
    //       </List>
    //     </Collapse>
    //   </ListItem>
    // );
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
              return this.renderCollapseableLink(route, index);
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
        {/* <div className={classes.photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div> */}
        <List className={classes.list}>
          <ListItem className={classes.item + ' ' + classes.userItem}>
            <CustomLink
              to={'#'}
              className={classes.itemLink + ' ' + classes.userCollapseButton}
              onClick={this.toggleAvatarCollapse}
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

export default withStyles(sidebarStyle)(withAuth<Props>(Sidebar));
