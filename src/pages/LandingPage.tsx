import classNames from 'classnames';
import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import Button from 'src/components/Button';
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

// const dashboardRoutes = [];

class LandingPage extends React.Component<WithStyles> {
  public render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          // routes={dashboardRoutes}
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white',
          }}
          {...rest}
        />
        <Parallax filter image={require('src/static/images/tenniscourt2.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                  Every landing page needs a small description after the big bold title, that's why
                  we added this text here. Add here all the information that can make you or your
                  product create the first impression.
                </h4>
                <br />
                <Button
                  myColor="danger"
                  mySize="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
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
