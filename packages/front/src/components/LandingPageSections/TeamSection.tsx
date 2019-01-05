import classNames from 'classnames';
import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

import Button from 'components/Button';
import Card from 'components/Card';
import CardBody from 'components/CardBody';
import CardFooter from 'components/CardFooter';

import teamStyle from 'styles/jss/landingPageSections/teamStyle';

import alexImageHD from 'static/images/alexHD.jpg';
import parentsImageHD from 'static/images/parentsHD.jpg';

class TeamSection extends React.Component<WithStyles> {
  public render() {
    const { classes } = this.props;
    const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Here is our team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={alexImageHD} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Gigi Hadid
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about one of your team members. You can give more
                    details about what they do. Feel free to add some <a href="#pablo">links</a> for
                    people to be able to follow them outside the site.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-twitter'} />
                  </Button>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-instagram'} />
                  </Button>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-facebook'} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={parentsImageHD} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Christian Louboutin
                  <br />
                  <small className={classes.smallTitle}>Designer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about one of your team members. You can give more
                    details about what they do. Feel free to add some <a href="#pablo">links</a> for
                    people to be able to follow them outside the site.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-twitter'} />
                  </Button>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-linkedin'} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={alexImageHD} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Kendall Jenner
                  <br />
                  <small className={classes.smallTitle}>Model</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about one of your team members. You can give more
                    details about what they do. Feel free to add some <a href="#pablo">links</a> for
                    people to be able to follow them outside the site.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-twitter'} />
                  </Button>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-instagram'} />
                  </Button>
                  <Button justIcon myColor="transparent" className={classes.margin5}>
                    <i className={classes.socials + ' fab fa-facebook'} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
