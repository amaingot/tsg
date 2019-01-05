import * as Sentry from '@sentry/browser';
import cx from 'classnames';
import { Location } from 'history';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

// @material-ui/core components
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// core components
import Footer from 'components/Footer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import dashboardRoutes from 'routes/dashboard';
import { ApplicationState } from 'store/index';

import appStyle from 'styles/jss/layouts/dashboardStyle';

import logo from 'static/material-images/logo-white.svg';
import image from 'static/material-images/sidebar-2.jpg';
import CustomRedirect from 'utils/CustomRedirect';
import CustomRoute from 'utils/CustomRoute';

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((route, routeIndex) => {
      if (route.redirect && route.pathTo) {
        return <CustomRedirect from={route.path} to={route.pathTo} key={routeIndex} />;
      }
      if (route.collapse && route.views) {
        return route.views.map((view, viewIndex) => {
          return (
            <CustomRoute privatePath path={view.path} component={view.component} key={viewIndex} />
          );
        });
      }
      return (
        <CustomRoute privatePath path={route.path} component={route.component} key={routeIndex} />
      );
    })}
  </Switch>
);

interface Props extends WithStyles {
  location: Location;
}

interface State {
  mobileOpen: boolean;
  miniActive: boolean;
}

let ps: PerfectScrollbar;

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
    };
    this.mainPanel = React.createRef<HTMLDivElement>();
  }

  public mainPanel: React.RefObject<HTMLDivElement>;

  public componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1 && this.mainPanel.current) {
      ps = new PerfectScrollbar(this.mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', this.resizeFunction);
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  public componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
    window.removeEventListener('resize', this.resizeFunction);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.location.pathname !== prevProps.location.pathname && this.mainPanel.current) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  public handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  public getRoute() {
    return this.props.location.pathname !== '/maps/full-screen-maps';
  }

  public sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }

  public resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  public render() {
    const { classes, ...rest } = this.props;
    const mainPanelClasses =
      classes.mainPanel +
      ' ' +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
      });
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={'Creative Tim'}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanelClasses} ref={this.mainPanel}>
          <Header
            sidebarMinimize={this.sidebarMinimize}
            miniActive={this.state.miniActive}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>
      </div>
    );
  }
}

const mapState2Props = (state: ApplicationState) => {
  return {
    location: state.router.location,
  };
};

export default connect(mapState2Props)(withStyles(appStyle)(Dashboard));
