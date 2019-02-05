import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

import AvTimerRounded from '@material-ui/icons/AvTimerRounded';
import ContactPhoneRounded from '@material-ui/icons/ContactPhoneRounded';
import TrendingUpRounded from '@material-ui/icons/TrendingUpRounded';

import GridContainer from 'src/components/GridContainer';
import GridItem from 'src/components/GridItem';
import InfoAreaKit from 'src/components/Kit/InfoArea';

import productStyle from 'src/styles/jss/landingPageSections/productStyle';

class ProductSection extends React.Component<WithStyles> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Let's talk shop</h2>
            <h5 className={classes.description}>
              Running a tennis shop these days isn't as easy as it used to be! Keeping up with the
              ever-presense of technology and online retailers is no small task. The Guru helps you
              gain a competitive edge by increasing the quality of your services experience.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoAreaKit
                title="Customer Notifications"
                description="Every time you complete a string job, The Guru automatically notifies the customer that its time to pick up their racket!"
                icon={ContactPhoneRounded}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoAreaKit
                title="Simple Reports"
                description="With The Guru, quickly find which strings are selling the most, which employee is stringing the most rackets, and much more!"
                icon={TrendingUpRounded}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoAreaKit
                title="Hours Tracking"
                description="Say good bye to employee time cards! Your shop workers can eaisly login and to clock in and out for their shifts."
                icon={AvTimerRounded}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
