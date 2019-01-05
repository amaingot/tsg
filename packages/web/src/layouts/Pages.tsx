import * as Sentry from '@sentry/browser';
import React from 'react';
import { Switch } from 'react-router-dom';

// @material-ui/core components
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// core components
import Footer from 'components/Footer';
import PagesHeader from 'components/PagesHeader';

import pagesRoutes from 'routes/pages';
import CustomRedirect from 'utils/CustomRedirect';
import CustomRoute from 'utils/CustomRoute';

import pagesStyle from 'styles/jss/layouts/pagesStyle';

import bgImage from 'static/images/tenniscourt2.jpg';

class Pages extends React.Component<WithStyles> {
  public componentDidMount() {
    document.body.style.overflow = 'unset';
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  public render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PagesHeader {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage} style={{ backgroundImage: 'url(' + bgImage + ')' }}>
            <Switch>
              {pagesRoutes.map((route, routeIndex) => {
                if (route.collapse) {
                  return null;
                }
                if (route.redirect) {
                  return (
                    <CustomRedirect from={route.path} to={route.pathTo || ''} key={routeIndex} />
                  );
                }
                return (
                  <CustomRoute path={route.path} component={route.component} key={routeIndex} />
                );
              })}
            </Switch>
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(pagesStyle)(Pages);