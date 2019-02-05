import classNames from 'classnames';
import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
// import Button from 'src/components/Button';
import GridContainer from 'src/components/GridContainer';
import GridItem from 'src/components/GridItem';
import Footer from 'src/components/Kit/Footer';
import Header from 'src/components/Kit/Header';
import HeaderLinks from 'src/components/Kit/HeaderLinks';
import Parallax from 'src/components/Kit/Parallax';

import landingPageStyle from 'src/styles/jss/views/landingPage';

// Sections for this page
import ProductSection from 'src/components/LandingPageSections/ProductSection';
import TeamSection from 'src/components/LandingPageSections/TeamSection';
import WorkSection from 'src/components/LandingPageSections/WorkSection';

class LandingPage extends React.Component<WithStyles> {
  public render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 350,
            color: 'white',
          }}
          {...rest}
        />
        <Parallax filter image={require('src/static/images/tenniscourt2.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your tennis shop simplified.</h1>
                <h4>
                  Tennis Shop Guru is a cloud based shop management system that organizes customer
                  string jobs and employee hours.
                </h4>
                {/* <br />
                <Button myColor="success" mySize="lg" to="/signup">
                  Sign up now
                </Button> */}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <TeamSection />
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
