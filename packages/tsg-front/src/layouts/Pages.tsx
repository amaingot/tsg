import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// @material-ui/core components
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// core components
import Footer from 'components/Footer/Footer';
import PagesHeader from 'components/Header/PagesHeader';

import pagesRoutes from 'routes/pages';

import pagesStyle from 'styles/jss/layouts/pagesStyle';

import bgImage from 'assets/img/register.jpeg';

class Pages extends React.Component {
  public componentDidMount() {
    document.body.style.overflow = 'unset';
  }
  public render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PagesHeader {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage} style={{ backgroundImage: 'url(' + bgImage + ')' }}>
            <Switch>
              {pagesRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                }
                return <Route path={prop.path} component={prop.component} key={key} />;
              })}
            </Switch>
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(pagesStyle)(Pages);
