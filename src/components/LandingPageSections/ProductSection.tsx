import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

import Chat from '@material-ui/icons/Chat';
import Fingerprint from '@material-ui/icons/Fingerprint';
import VerifiedUser from '@material-ui/icons/VerifiedUser';

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
            <h2 className={classes.title}>Let's talk product</h2>
            <h5 className={classes.description}>
              This is the paragraph where you can write more details about your product. Keep you
              user engaged by providing meaningful information. Remember that by this time, the user
              is curious, otherwise he wouldn't scroll to get here. Add a button if you want the
              user to see more.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoAreaKit
                title="Free Chat"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Chat}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoAreaKit
                title="Verified Users"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoAreaKit
                title="Fingerprint"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Fingerprint}
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
