import classNames from 'classnames';
import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import GridContainer from 'src/components/GridContainer';
import GridItem from 'src/components/GridItem';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import CardBody from 'src/components/CardBody';
import CardFooter from 'src/components/CardFooter';

import teamStyle from 'src/styles/jss/landingPageSections/teamStyle';

class TeamSection extends React.Component<WithStyles> {
  public render() {
    const { classes } = this.props;
    const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src={require('src/static/images/alexHD.jpg')}
                    alt="..."
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Alex Maingot
                  <br />
                  <small className={classes.smallTitle}>Founder / CEO</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Alex is a software engineer by day and entreprenuer by night. This is some sort
                    of bio that should impress everyone who reads it. Alex is a rather important
                    individual, and if you haven't realized it yet, you just did.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    myColor="transparent"
                    className={classes.margin5}
                    href="https://twitter.com/alexmaingot"
                  >
                    <i className={classes.socials + ' fab fa-twitter'} />
                  </Button>
                  <Button
                    justIcon
                    myColor="transparent"
                    className={classes.margin5}
                    href="https://instagram.com/alexmaingot"
                  >
                    <i className={classes.socials + ' fab fa-instagram'} />
                  </Button>
                  <Button
                    justIcon
                    myColor="transparent"
                    className={classes.margin5}
                    href="https://www.linkedin.com/in/alexmaingot/"
                  >
                    <i className={classes.socials + ' fab fa-linkedin'} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src={require('src/static/images/parentsHD.jpg')}
                    alt="..."
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Gerry and Penny Maingot
                  <br />
                  <small className={classes.smallTitle}>Co-COOs / Co-Founders</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    As individuals they are world reknown in their respective crafts, but together
                    they make the best parental duo in the known universe. They also have over 80
                    years of combined experience running tennis shops.
                  </p>
                </CardBody>
                {/* <CardFooter className={classes.justifyCenter}>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-twitter'} />
                  </Button>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-linkedin'} />
                  </Button>
                </CardFooter> */}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
