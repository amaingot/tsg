import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/icons/Menu';

import Image from 'components/elements/Image';
import Logo from 'static/largeColorLogo.png';
import HeaderStyle from 'styles/HeaderStyle';
import { Color } from 'styles/Theme';

const StyledImage = styled(Image)`
  height: 70px;
`;

interface HeaderProps extends WithStyles {
  classes: Record<string, string>;
  color?: Color;
  rightLinks?: React.ReactNode | React.ReactNodeArray;
  leftLinks?: React.ReactNode | React.ReactNodeArray;
  brand?: string;
  fixed?: boolean;
  absolute?: boolean;
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: {
    height: number;
    color: Color;
  };
}

interface HeaderState {
  mobileOpen: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }

  public handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  public componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener('scroll', this.headerColorChange);
    }
  }

  public headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body.getElementsByTagName('header')[0].classList.remove(classes[color || 'white']);
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body.getElementsByTagName('header')[0].classList.add(classes[color || 'white']);
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }

  public componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener('scroll', this.headerColorChange);
    }
  }

  public render() {
    const { classes, color, rightLinks, leftLinks, fixed, absolute } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color || 'white']]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed,
    });
    const brandComponent = <StyledImage src={Logo} />;
    return (
      <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex}>
            {leftLinks !== undefined ? (
              <Hidden smDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
              brandComponent
            )}
          </div>
          <Hidden smDown implementation="css">
            {rightLinks}
          </Hidden>
          <Hidden mdUp>
            <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerToggle}>
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={'right'}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    );
  }
}

export default withStyles(HeaderStyle)(Header);
